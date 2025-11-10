use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::errors::DealForgeError;
use crate::state::{Offer, OFFER_SEED};

use super::shared::{close_token_account, transfer_tokens};

#[derive(Accounts)]
pub struct TakeOffer<'info> {
    #[account(mut)]
    pub taker: Signer<'info>,

    #[account(mut)]
    pub maker: SystemAccount<'info>,

    pub offered_mint: InterfaceAccount<'info, Mint>,

    pub requested_mint: InterfaceAccount<'info, Mint>,

    /// Taker’s token account for offered_mint (they’ll receive maker’s tokens)
    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = offered_mint,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_offered_ata: InterfaceAccount<'info, TokenAccount>,

    /// Taker's token account holding requested_mint
    #[account(
        mut,
        associated_token::mint = requested_mint,
        associated_token::authority = taker,
        associated_token::token_program = token_program,
    )]
    pub taker_requested_ata: InterfaceAccount<'info, TokenAccount>,

    /// maker’s token account for requested_mint (where taker sends payment)
    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = requested_mint,
        associated_token::authority = maker,
        associated_token::token_program = token_program,
    )]
    pub maker_requested_ata: InterfaceAccount<'info, TokenAccount>,

    #[account(
        mut,
        has_one = maker,
        has_one = requested_mint,
        has_one = offered_mint,
        seeds = [OFFER_SEED.as_bytes(), maker.key().as_ref(), offer.id.to_le_bytes().as_ref()],
        bump = offer.bump,
    )]
    pub offer: Account<'info, Offer>,

    #[account(
        mut,
        associated_token::mint = offered_mint,
        associated_token::authority = offer,
        associated_token::token_program = token_program,
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,

    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

pub fn handler(context: Context<TakeOffer>, take_amount: u64) -> Result<()> {
    let offer = &context.accounts.offer;
    
    // Validate take amount
    require!(take_amount > 0, DealForgeError::InvalidTakeAmount);
    require!(
        take_amount <= offer.offered_amount,
        DealForgeError::ExceedsOfferAmount
    );
    
    // Check if partial fills are allowed
    if !offer.allow_partial {
        // Seller requires all-or-nothing
        require!(
            take_amount == offer.offered_amount,
            DealForgeError::PartialFillsNotAllowed
        );
    }
    
    // Calculate proportional requested amount
    // Use u128 to prevent overflow
    let requested_amount = (take_amount as u128)
        .checked_mul(offer.requested_amount as u128)
        .ok_or(DealForgeError::CalculationOverflow)?
        .checked_div(offer.offered_amount as u128)
        .ok_or(DealForgeError::CalculationOverflow)? as u64;
    
    // Ensure taker has enough of the requested token
    require!(
        context.accounts.taker_requested_ata.amount >= requested_amount,
        DealForgeError::InsufficientBalance
    );
    
    // Transfer requested tokens from taker to maker
    transfer_tokens(
        &context.accounts.taker_requested_ata,
        &context.accounts.maker_requested_ata,
        &requested_amount,
        &context.accounts.requested_mint,
        &context.accounts.taker.to_account_info(),
        &context.accounts.token_program,
        None,
    )?;
    
    let maker_key = context.accounts.maker.key();
    let offer_id_bytes = context.accounts.offer.id.to_le_bytes();

    let offer_account_seeds: &[&[u8]] = &[
        OFFER_SEED.as_bytes(),
        maker_key.as_ref(),
        &offer_id_bytes,
        &[context.accounts.offer.bump],
    ];
    let signers_seeds = Some(offer_account_seeds);

    // Transfer offered tokens from vault to taker
    transfer_tokens(
        &context.accounts.vault,
        &context.accounts.taker_offered_ata,
        &take_amount,
        &context.accounts.offered_mint,
        &context.accounts.offer.to_account_info(),
        &context.accounts.token_program,
        signers_seeds,
    )?;

    // Update offer amounts
    let offer = &mut context.accounts.offer;
    offer.offered_amount = offer.offered_amount.checked_sub(take_amount)
        .ok_or(DealForgeError::CalculationOverflow)?;
    offer.requested_amount = offer.requested_amount.checked_sub(requested_amount)
        .ok_or(DealForgeError::CalculationOverflow)?;

    // Close vault and offer account only if fully filled
    if offer.offered_amount == 0 {
        close_token_account(
            &context.accounts.vault,
            &context.accounts.maker.to_account_info(),
            &context.accounts.offer.to_account_info(),
            &context.accounts.token_program,
            signers_seeds,
        )?;
        
        // Close the offer account and return rent to maker
        let offer_account_info = context.accounts.offer.to_account_info();
        let maker_account_info = context.accounts.maker.to_account_info();
        
        **maker_account_info.lamports.borrow_mut() += **offer_account_info.lamports.borrow();
        **offer_account_info.lamports.borrow_mut() = 0;
    }
    
    Ok(())
}
