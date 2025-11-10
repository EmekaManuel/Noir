import type { Address, KeyPairSigner } from "gill";
import { loadKeypairSignerFromFile } from "gill/node";
import { getAssociatedTokenAccountAddress } from "gill/programs";
import { beforeAll, describe, expect, it } from "vitest";
import {
  DEALFORGE_ERROR__INSUFFICIENT_BALANCE,
  DEALFORGE_ERROR__INVALID_OFFERED_MINT_AMOUNT,
  DEALFORGE_ERROR__INVALID_REQUESTED_MINT_AMOUNT,
  DEALFORGE_ERROR__PARTIAL_FILLS_NOT_ALLOWED,
  DEALFORGE_ERROR__INVALID_TAKE_AMOUNT,
  DEALFORGE_ERROR__EXCEEDS_OFFER_AMOUNT,
  fetchOffer,
  getRefundOfferInstructionAsync,
  getTakeOfferInstructionAsync,
} from "../src";
import {
  createAndConfirmTransaction,
  createTestOffer,
  createToken,
  createWalletWithSol,
  getTokenAccountBalance,
  mintTokens,
  ONE_MINT_TOKEN,
  rpc,
  tokenProgram,
} from "./utils";

/** Turn on debug mode */
global.__GILL_DEBUG__ = true;

/** Set the debug mode log level (default: `info`) */
// global.__GILL_DEBUG_LEVEL__ = "debug";

const CUSTOM_FUNDS_ERROR_MESSAGE = "custom program error: #";

const aliceInitialTokenAAmount = 100n;
const bobInitialTokenAAmount = 10n;
const bobInitialTokenBAmount = 10n;
const tokenAOfferedAmount = 1n * ONE_MINT_TOKEN;
const tokenBWantedAmount = 1n * ONE_MINT_TOKEN;

describe("dealforge", () => {
  let signer: KeyPairSigner;
  let alice: KeyPairSigner;
  let bob: KeyPairSigner;
  let tokenMintA: KeyPairSigner;
  let tokenMintB: KeyPairSigner;
  let aliceTokenAccountA: Address;
  let aliceTokenAccountB: Address;
  let bobTokenAccountA: Address;
  let bobTokenAccountB: Address;

  let data: {
    maker: typeof alice;
    makerOfferedTokenAccount: typeof aliceTokenAccountA;
    makerRequestedTokenAccount: typeof aliceTokenAccountB;
    offeredMint: typeof tokenMintA;
    requestedMint: typeof tokenMintB;
    taker: typeof bob;
    takerOfferedTokenAccount: typeof bobTokenAccountA;
    takerRequestedTokenAccount: typeof bobTokenAccountB;
  };

  beforeAll(async () => {
    signer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET);
    alice = await createWalletWithSol();
    bob = await createWalletWithSol();
    // Create Tokens
    tokenMintA = await createToken(signer);
    tokenMintB = await createToken(signer);

    // Mint tokens A and save their address
    aliceTokenAccountA = await mintTokens({
      signer,
      destinationWallet: alice,
      mint: tokenMintA,
      amount: aliceInitialTokenAAmount,
    });

    bobTokenAccountA = await mintTokens({
      signer,
      destinationWallet: bob,
      mint: tokenMintA,
      amount: bobInitialTokenAAmount,
    });

    // Mint token B and save their addresses
    bobTokenAccountB = await mintTokens({
      signer,
      destinationWallet: bob,
      mint: tokenMintB,
      amount: bobInitialTokenBAmount,
    });

    // get alice token B address
    aliceTokenAccountB = await getAssociatedTokenAccountAddress(
      tokenMintB,
      alice,
      tokenProgram
    );
    data = {
      maker: alice,
      makerOfferedTokenAccount: aliceTokenAccountA,
      makerRequestedTokenAccount: aliceTokenAccountB,
      offeredMint: tokenMintA,
      requestedMint: tokenMintB,
      taker: bob,
      takerOfferedTokenAccount: bobTokenAccountA,
      takerRequestedTokenAccount: bobTokenAccountB,
    };
  });

  describe("makeOffer", () => {
    it("should successfully creates an offer with valid inputs", async () => {
      const { vault } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: tokenAOfferedAmount,
        tokenRequestedAmount: tokenBWantedAmount,
      });

      // Verify the offer was created successfully by checking the vault balance
      const vaultBalanceResponse = await getTokenAccountBalance(vault);
      const aliceBlance = await getTokenAccountBalance(aliceTokenAccountA);
      expect(BigInt(vaultBalanceResponse.amount)).toEqual(tokenAOfferedAmount);
      expect(BigInt(aliceBlance.amount)).toEqual(
        aliceInitialTokenAAmount * ONE_MINT_TOKEN - tokenAOfferedAmount
      );
    });

    it.concurrent.for([
      {
        offeredAmount: 1_00000n * ONE_MINT_TOKEN,
        requestedAmount: 1n,
        expectedError: DEALFORGE_ERROR__INSUFFICIENT_BALANCE,
      },
      {
        offeredAmount: 0n,
        requestedAmount: 1n,
        expectedError: DEALFORGE_ERROR__INVALID_OFFERED_MINT_AMOUNT,
      },
      {
        offeredAmount: 1_000n * ONE_MINT_TOKEN,
        requestedAmount: 0n,
        expectedError: DEALFORGE_ERROR__INVALID_REQUESTED_MINT_AMOUNT,
      },
    ])(
      "should fail to make offer when",
      async (
        { offeredAmount, requestedAmount, expectedError },
        { expect: localExpect }
      ) => {
        console.log(offeredAmount, requestedAmount);
        await localExpect(
          createTestOffer({
            maker: data.maker,
            offeredMint: data.offeredMint,
            requestedMint: data.requestedMint,
            makerTokenAccount: data.makerOfferedTokenAccount,
            tokenOfferedAmount: offeredAmount,
            tokenRequestedAmount: requestedAmount,
            skipPreflight: true,
          })
          // insufficient funds error
        ).rejects.toThrow(`${CUSTOM_FUNDS_ERROR_MESSAGE}${expectedError}`);
      }
    );
  });

  describe("takeOffer", () => {
    it("should successfully take offer and close offer account", async () => {
      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: tokenAOfferedAmount,
        tokenRequestedAmount: tokenBWantedAmount,
      });

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: tokenAOfferedAmount, // ← Take full amount
        tokenProgram,
      });

      await createAndConfirmTransaction({
        ix: [takeOfferInstruction],
        payer: data.taker,
      });
      const [
        aliceTokenABalanceAfter,
        aliceTokenBBalance,
        bobTokenABalanceAfter,
        bobTokenBBalance,
      ] = await Promise.all([
        getTokenAccountBalance(aliceTokenAccountA),
        getTokenAccountBalance(aliceTokenAccountB),
        getTokenAccountBalance(bobTokenAccountA),
        getTokenAccountBalance(bobTokenAccountB),
      ]);

      // verify each account balance
      // in previous test, we created one offer and this is second offer.
      expect(BigInt(aliceTokenABalanceAfter.amount)).toEqual(
        aliceInitialTokenAAmount * ONE_MINT_TOKEN - 2n * tokenAOfferedAmount
      );

      expect(BigInt(aliceTokenBBalance.amount)).toEqual(tokenBWantedAmount);

      expect(BigInt(bobTokenABalanceAfter.amount)).toEqual(
        bobInitialTokenAAmount * ONE_MINT_TOKEN + tokenAOfferedAmount
      );

      expect(BigInt(bobTokenBBalance.amount)).toEqual(
        bobInitialTokenAAmount * ONE_MINT_TOKEN - tokenBWantedAmount
      );

      // Account is not found as it is closed.
      await expect(fetchOffer(rpc, offer)).rejects.toThrow(
        `Account not found at address: ${offer}`
      );
    });

    it("should fails when taker has insufficient requested token balance", async () => {
      const { offer, vault } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: tokenAOfferedAmount,
        tokenRequestedAmount: 10_000_000_000n,
      });

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: tokenAOfferedAmount, // ← Take full amount
        tokenProgram,
      });

      await expect(
        createAndConfirmTransaction({
          ix: [takeOfferInstruction],
          payer: data.taker,
          skipPreflight: true,
        })
      ).rejects.toThrow(
        CUSTOM_FUNDS_ERROR_MESSAGE + DEALFORGE_ERROR__INSUFFICIENT_BALANCE
      );
    });
  });

  describe("refund", () => {
    it("should refund offer to the maker", async () => {
      const [
        aliceTokenABalanceBefore,
        aliceTokenBBalanceBefore,
        bobTokenABalanceBefore,
        bobTokenBBalanceBefore,
      ] = await Promise.all([
        getTokenAccountBalance(aliceTokenAccountA),
        getTokenAccountBalance(aliceTokenAccountB),
        getTokenAccountBalance(bobTokenAccountA),
        getTokenAccountBalance(bobTokenAccountB),
      ]);

      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: tokenAOfferedAmount,
        tokenRequestedAmount: tokenBWantedAmount,
      });

      // Verify the offer was created successfully by checking the vault balance
      const vaultBalanceResponse = await getTokenAccountBalance(vault);
      const aliceBlance = await getTokenAccountBalance(aliceTokenAccountA);
      expect(BigInt(vaultBalanceResponse.amount)).toEqual(tokenAOfferedAmount);
      expect(BigInt(aliceBlance.amount)).toEqual(
        BigInt(aliceTokenABalanceBefore.amount) - tokenAOfferedAmount
      );

      const refundOfferInstruction = await getRefundOfferInstructionAsync({
        maker: data.maker,
        offeredMint: data.offeredMint.address,
        makerOfferedAta: data.makerOfferedTokenAccount,
        offer,
        vault,
        tokenProgram,
      });

      await createAndConfirmTransaction({
        ix: [refundOfferInstruction],
        payer: data.taker,
        skipPreflight: true,
      });

      const [
        aliceTokenABalanceAfter,
        aliceTokenBBalanceAfter,
        bobTokenABalanceAfter,
        bobTokenBBalanceAfter,
      ] = await Promise.all([
        getTokenAccountBalance(aliceTokenAccountA),
        getTokenAccountBalance(aliceTokenAccountB),
        getTokenAccountBalance(bobTokenAccountA),
        getTokenAccountBalance(bobTokenAccountB),
      ]);

      // verify each account balance should be back to it's original
      expect(aliceTokenABalanceAfter.amount).toEqual(
        aliceTokenABalanceBefore.amount
      );

      expect(aliceTokenBBalanceAfter.amount).toEqual(
        aliceTokenBBalanceBefore.amount
      );

      expect(bobTokenABalanceAfter.amount).toEqual(
        bobTokenABalanceBefore.amount
      );

      expect(bobTokenBBalanceAfter.amount).toEqual(
        bobTokenBBalanceBefore.amount
      );

      // Account is not found as it is closed.
      await expect(fetchOffer(rpc, offer)).rejects.toThrow(
        `Account not found at address: ${offer}`
      );
    });

    it("should not refund when non maker tries refund", async () => {
      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: tokenAOfferedAmount,
        tokenRequestedAmount: tokenBWantedAmount,
      });

      const refundOfferInstruction = await getRefundOfferInstructionAsync({
        maker: data.maker,
        offeredMint: data.offeredMint.address,
        makerOfferedAta: data.takerOfferedTokenAccount,
        offer,
        vault,
        tokenProgram,
      });

      await expect(
        createAndConfirmTransaction({
          ix: [refundOfferInstruction],
          payer: data.taker,
          skipPreflight: true,
        })
      ).rejects.toThrowError(`${CUSTOM_FUNDS_ERROR_MESSAGE}2015`);
    });
  });

  describe("partialFills", () => {
    it("should allow partial fill when allowPartial is true", async () => {
      const offeredAmount = 10n * ONE_MINT_TOKEN;
      const requestedAmount = 5n * ONE_MINT_TOKEN;

      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: offeredAmount,
        tokenRequestedAmount: requestedAmount,
        allowPartial: true, // ← Enable partial fills
      });

      // Bob wants to take only 50% (5 Token A)
      const partialTakeAmount = 5n * ONE_MINT_TOKEN;
      const expectedRequestedAmount = 2n * ONE_MINT_TOKEN + 500_000_000n; // 2.5 Token B

      // Get balances BEFORE the partial fill
      const [bobTokenABefore, bobTokenBBefore] = await Promise.all([
        getTokenAccountBalance(bobTokenAccountA),
        getTokenAccountBalance(bobTokenAccountB),
      ]);

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: partialTakeAmount, // ← Take only 5 out of 10
        tokenProgram,
      });

      await createAndConfirmTransaction({
        ix: [takeOfferInstruction],
        payer: data.taker,
      });

      // Verify balances after partial fill
      const [bobTokenAAfter, bobTokenBAfter, vaultBalanceAfter] =
        await Promise.all([
          getTokenAccountBalance(bobTokenAccountA),
          getTokenAccountBalance(bobTokenAccountB),
          getTokenAccountBalance(vault),
        ]);

      // Bob received 5 Token A (relative to before)
      expect(BigInt(bobTokenAAfter.amount)).toEqual(
        BigInt(bobTokenABefore.amount) + partialTakeAmount
      );

      // Bob paid ~2.5 Token B (relative to before)
      expect(BigInt(bobTokenBAfter.amount)).toEqual(
        BigInt(bobTokenBBefore.amount) - expectedRequestedAmount
      );

      // Vault still has 5 Token A remaining
      expect(BigInt(vaultBalanceAfter.amount)).toEqual(
        offeredAmount - partialTakeAmount
      );

      // Offer account should still exist (not fully filled)
      const offerAfter = await fetchOffer(rpc, offer);
      expect(offerAfter.data.offeredAmount).toEqual(
        offeredAmount - partialTakeAmount
      );
      expect(offerAfter.data.requestedAmount).toEqual(
        requestedAmount - expectedRequestedAmount
      );
    });

    it("should close offer when fully filled through partial fills", async () => {
      const offeredAmount = 10n * ONE_MINT_TOKEN;
      const requestedAmount = 5n * ONE_MINT_TOKEN;

      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: offeredAmount,
        tokenRequestedAmount: requestedAmount,
        allowPartial: true,
      });

      // First fill: 30%
      const firstTake = 3n * ONE_MINT_TOKEN;
      await createAndConfirmTransaction({
        ix: [
          await getTakeOfferInstructionAsync({
            maker: data.maker.address,
            taker: data.taker,
            offeredMint: data.offeredMint.address,
            requestedMint: data.requestedMint.address,
            makerRequestedAta: data.makerRequestedTokenAccount,
            takerOfferedAta: data.takerOfferedTokenAccount,
            takerRequestedAta: data.takerRequestedTokenAccount,
            offer,
            vault,
            takeAmount: firstTake,
            tokenProgram,
          }),
        ],
        payer: data.taker,
      });

      // Second fill: 70% (should close offer)
      const secondTake = 7n * ONE_MINT_TOKEN;
      await createAndConfirmTransaction({
        ix: [
          await getTakeOfferInstructionAsync({
            maker: data.maker.address,
            taker: data.taker,
            offeredMint: data.offeredMint.address,
            requestedMint: data.requestedMint.address,
            makerRequestedAta: data.makerRequestedTokenAccount,
            takerOfferedAta: data.takerOfferedTokenAccount,
            takerRequestedAta: data.takerRequestedTokenAccount,
            offer,
            vault,
            takeAmount: secondTake,
            tokenProgram,
          }),
        ],
        payer: data.taker,
      });

      // Offer should be closed
      await expect(fetchOffer(rpc, offer)).rejects.toThrow(
        `Account not found at address: ${offer}`
      );
    });

    it("should reject partial fill when allowPartial is false", async () => {
      const offeredAmount = 10n * ONE_MINT_TOKEN;
      const requestedAmount = 5n * ONE_MINT_TOKEN;

      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: offeredAmount,
        tokenRequestedAmount: requestedAmount,
        allowPartial: false, // ← Disable partial fills
      });

      // Try to take only 50% - should fail
      const partialTakeAmount = 5n * ONE_MINT_TOKEN;

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: partialTakeAmount,
        tokenProgram,
      });

      await expect(
        createAndConfirmTransaction({
          ix: [takeOfferInstruction],
          payer: data.taker,
          skipPreflight: true,
        })
      ).rejects.toThrow(
        `${CUSTOM_FUNDS_ERROR_MESSAGE}${DEALFORGE_ERROR__PARTIAL_FILLS_NOT_ALLOWED}`
      );
    });

    it("should reject taking more than available", async () => {
      const offeredAmount = 10n * ONE_MINT_TOKEN;
      const requestedAmount = 5n * ONE_MINT_TOKEN;

      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: offeredAmount,
        tokenRequestedAmount: requestedAmount,
        allowPartial: true,
      });

      // Try to take more than offered - should fail
      const excessiveTakeAmount = 15n * ONE_MINT_TOKEN;

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: excessiveTakeAmount,
        tokenProgram,
      });

      await expect(
        createAndConfirmTransaction({
          ix: [takeOfferInstruction],
          payer: data.taker,
          skipPreflight: true,
        })
      ).rejects.toThrow(
        `${CUSTOM_FUNDS_ERROR_MESSAGE}${DEALFORGE_ERROR__EXCEEDS_OFFER_AMOUNT}`
      );
    });

    it("should reject zero take amount", async () => {
      const { vault, offer } = await createTestOffer({
        maker: data.maker,
        offeredMint: data.offeredMint,
        requestedMint: data.requestedMint,
        makerTokenAccount: data.makerOfferedTokenAccount,
        tokenOfferedAmount: 10n * ONE_MINT_TOKEN,
        tokenRequestedAmount: 5n * ONE_MINT_TOKEN,
        allowPartial: true,
      });

      const takeOfferInstruction = await getTakeOfferInstructionAsync({
        maker: data.maker.address,
        taker: data.taker,
        offeredMint: data.offeredMint.address,
        requestedMint: data.requestedMint.address,
        makerRequestedAta: data.makerRequestedTokenAccount,
        takerOfferedAta: data.takerOfferedTokenAccount,
        takerRequestedAta: data.takerRequestedTokenAccount,
        offer,
        vault,
        takeAmount: 0n, // ← Invalid: zero amount
        tokenProgram,
      });

      await expect(
        createAndConfirmTransaction({
          ix: [takeOfferInstruction],
          payer: data.taker,
          skipPreflight: true,
        })
      ).rejects.toThrow(
        `${CUSTOM_FUNDS_ERROR_MESSAGE}${DEALFORGE_ERROR__INVALID_TAKE_AMOUNT}`
      );
    });
  });
});
