"use client";

import { ArrowLeft } from "lucide-react";
import { useWalletUi } from "@wallet-ui/react";
import Link from "next/link";
import { OfferListing } from "@/components/dealforge/offer-listing";
import { WalletButton } from "@/components/solana/solana-provider";
import { Button } from "@/components/ui/button";

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
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <Button
        variant="ghost"
        className="mb-6 -ml-2"
        asChild
      >
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-4xl text-foreground">
          My Deals
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your active trading offers
        </p>
      </div>
      <OfferListing filterByMaker={account.address} />
    </div>
  );
}

