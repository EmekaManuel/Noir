"use client";

import { useWalletUi } from "@wallet-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { OfferForm } from "@/components/dealforge/offer-form";
import { WalletButton } from "@/components/solana/solana-provider";
import { Button } from "@/components/ui/button";

export default function CreateOfferPage() {
  const { account } = useWalletUi();
  const router = useRouter();

  const handleOfferCreated = () => {
    // Redirect to dashboard to show all offers after creating
    router.push("/dashboard");
  };

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl text-foreground">
            Connect Wallet
          </h1>
          <p className="mb-8 text-muted-foreground">
            Please connect your wallet to create offers
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button asChild className="-ml-2 mb-6" variant="ghost">
        <Link href="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="mb-2 font-bold text-4xl text-foreground">
          Create OTC Deal
        </h1>
        <p className="text-lg text-muted-foreground">
          Set up a new over-the-counter trade
        </p>
      </div>

      <OfferForm onSuccess={handleOfferCreated} />
    </div>
  );
}
