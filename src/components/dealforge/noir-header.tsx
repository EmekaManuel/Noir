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
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
          <Link href="/" className="font-semibold text-xl tracking-tight hover:opacity-80 transition-opacity">
            Noir 
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse Deals
          </Link>
          <Link
            href="/dashboard/create-offer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Create Deal
          </Link>
          {account && (
            <Link
              href="/dashboard/my-deals"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
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

