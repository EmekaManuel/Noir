"use client";

import { useWalletUi } from "@wallet-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { OfferListing } from "@/components/dealforge/offer-listing";
import { WalletButton } from "@/components/solana/solana-provider";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { account } = useWalletUi();

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl text-foreground">
            Connect Wallet
          </h1>
          <p className="mb-8 text-muted-foreground">
            Please connect your wallet to access the trading platform
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button asChild className="-ml-2 mb-6" variant="ghost">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="mb-2 font-bold text-4xl text-foreground">
          Browse Offers
        </h1>
        <p className="text-lg text-muted-foreground">
          Search for and interact with existing offers
        </p>
      </div>
      <OfferListing />
    </div>
  );
}
