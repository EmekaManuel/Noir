pub mod errors;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;
use instructions::*;

declare_id!("Xhjc4BZkWM8eTESN5t1Pfmyknerk7ecPJmUqfTf6UU1");

#[program]
pub mod dealforge {
    use super::*;

    pub fn make_offer(
        context: Context<MakeOffer>,
        id: u64,
        offered_amount: u64,
        requested_amount: u64,
        allow_partial: bool,
    ) -> Result<()> {
        make_offer::handler(context, id, offered_amount, requested_amount, allow_partial)
    }

    pub fn take_offer(context: Context<TakeOffer>, take_amount: u64) -> Result<()> {
        take_offer::handler(context, take_amount)
    }

    pub fn refund_offer(context: Context<RefundOffer>) -> Result<()> {
        refund_offer::handler(context)
    }
}
