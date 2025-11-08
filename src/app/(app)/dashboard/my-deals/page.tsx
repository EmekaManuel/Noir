"use client";

import { useWalletUi } from "@wallet-ui/react";
import { OfferListing } from "@/components/dealforge/offer-listing";
import { WalletButton } from "@/components/solana/solana-provider";

export default function MyDealsPage() {
  const { account } = useWalletUi();

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl text-foreground">
            Connect Wallet
          </h1>
          <p className="mb-8 text-muted-foreground">
            Please connect your wallet to view your deals
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-3xl text-foreground">
          My Deals
        </h1>
        <p className="text-muted-foreground">
          Manage your active trading offers
        </p>
      </div>
      <OfferListing filterByMaker={account.address} />
    </div>
  );
}

