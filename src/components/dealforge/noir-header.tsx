"use client";

import { useWalletUi } from "@wallet-ui/react";
import Link from "next/link";
import { WalletButton } from "@/components/solana/solana-provider";
import { ThemeSelect } from "@/components/theme-select";

export function NoirHeader() {
  const { account } = useWalletUi();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <span className="font-bold text-primary-foreground text-sm">N</span>
          </div>
          <Link href="/" className="font-semibold text-xl tracking-tight hover:opacity-80 transition-opacity">
            Noir 
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/dashboard"
          >
            Browse Deals
          </Link>
          <Link
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/dashboard/create-offer"
          >
            Create Deal
          </Link>
          {account && (
            <Link
              className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="/dashboard/my-deals"
            >
              My Deals
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSelect />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
