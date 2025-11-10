"use client";

import { useWalletUi } from "@wallet-ui/react";
import { FileText, LayoutDashboard, Menu, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { WalletButton } from "@/components/solana/solana-provider";
import { ThemeSelect } from "@/components/theme-select";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NoirHeader() {
  const { account } = useWalletUi();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
            <span className="font-bold text-primary-foreground text-sm">N</span>
          </div>
          <Link
            className="font-semibold text-xl tracking-tight transition-opacity hover:opacity-80"
            href="/"
          >
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
            <>
              <Link
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                href="/dashboard/my-deals"
              >
                My Deals
              </Link>
              <Link
                className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
                href="/profile"
              >
                My Profile
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <ThemeSelect />
          </div>
          <div className="hidden sm:block">
            <WalletButton />
          </div>
          <Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                aria-label="Toggle menu"
                className="h-9 w-9 hover:bg-muted/50 md:hidden"
                size="icon"
                variant="ghost"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px] p-0 sm:w-[400px]" side="right">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b px-6 pt-6 pb-4">
                  <SheetTitle className="font-semibold text-xl">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <div className="flex flex-col gap-1">
                    <Link
                      className="group flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/50 hover:text-foreground active:bg-muted"
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-5 w-5 shrink-0 transition-colors group-hover:text-foreground" />
                      <span>Browse Deals</span>
                    </Link>
                    <Link
                      className="group flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/50 hover:text-foreground active:bg-muted"
                      href="/dashboard/create-offer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Plus className="h-5 w-5 shrink-0 transition-colors group-hover:text-foreground" />
                      <span>Create Deal</span>
                    </Link>
                    {account && (
                      <>
                        <Link
                          className="group flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/50 hover:text-foreground active:bg-muted"
                          href="/dashboard/my-deals"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <FileText className="h-5 w-5 shrink-0 transition-colors group-hover:text-foreground" />
                          <span>My Deals</span>
                        </Link>
                        <Link
                          className="group flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-muted-foreground text-sm transition-all hover:bg-muted/50 hover:text-foreground active:bg-muted"
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <User className="h-5 w-5 shrink-0 transition-colors group-hover:text-foreground" />
                          <span>My Profile</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="mt-6 space-y-3 border-t pt-6">
                    <div className="px-2">
                      <p className="mb-3 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Settings
                      </p>
                      <div className="space-y-2">
                        <div className="px-2">
                          <ThemeSelect />
                        </div>
                        <div className="px-2">
                          <WalletButton />
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
