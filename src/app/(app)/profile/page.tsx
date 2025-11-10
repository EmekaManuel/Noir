"use client";

import { useWalletUi } from "@wallet-ui/react";
import { address } from "gill";
import {
  AccountBalance,
  AccountButtons,
  AccountTokens,
  AccountTransactions,
} from "@/components/account/account-ui";
import { AppHero } from "@/components/app-hero";
import { ExplorerLink } from "@/components/cluster/cluster-ui";
import { WalletButton } from "@/components/solana/solana-provider";
import { ellipsify } from "@/lib/utils";

export default function ProfilePage() {
  const { account } = useWalletUi();

  if (!account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl text-foreground">
            Connect Wallet
          </h1>
          <p className="mb-8 text-muted-foreground">
            Please connect your wallet to view your profile
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  const walletAddress = address(account.address);

  return (
    <div className="px-4 py-4 md:py-6 lg:px-6">
      <AppHero
        subtitle={
          <div className="my-4">
            <ExplorerLink
              address={walletAddress.toString()}
              label={ellipsify(walletAddress.toString())}
            />
          </div>
        }
        title={<AccountBalance address={walletAddress} />}
      >
        <div className="my-4">
          <AccountButtons address={walletAddress} />
        </div>
      </AppHero>
      <div className="space-y-8">
        <AccountTokens address={walletAddress} />
        <AccountTransactions address={walletAddress} />
      </div>
    </div>
  );
}
