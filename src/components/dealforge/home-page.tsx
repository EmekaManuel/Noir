"use client";

import { useWalletUi } from "@wallet-ui/react";
import {
  ArrowRight,
  Brain,
  Lock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { WalletButton } from "@/components/solana/solana-provider";
import { ThemeSelect } from "@/components/theme-select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DealforgeHomePage() {
  const { account } = useWalletUi();
  const router = useRouter();

  // Redirect to dashboard if wallet is connected
  useEffect(() => {
    if (account) {
      router.push("/dashboard");
    }
  }, [account, router]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-xl tracking-tight">Noir OTC</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSelect />
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto relative py-32 lg:py-40">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="mb-6 font-semibold text-5xl tracking-tight sm:text-6xl md:text-7xl">
            Private OTC Trading
          </h1>

          <p className="mb-12 max-w-[640px] text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Institutional-grade over-the-counter trading with zero-knowledge privacy
            and AI-powered risk management. Trade large blocks without market impact.
          </p>

          {!account && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Connect wallet to continue</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto py-20">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          <Card className="border-0 bg-muted/30">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                Total Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">$2.4M</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-muted/30">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                Active Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">1,248</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-muted/30">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-sm font-normal text-muted-foreground">
                Settlement Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">&lt;1s</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Zero-Knowledge Privacy</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Trade details remain private through zk-proof verification. Prove
              transaction validity without revealing sensitive information.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Brain className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">AI Risk Management</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Automated counterparty analysis and risk assessment. Real-time
              monitoring ensures secure, compliant transactions.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Instant Settlement</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Solana-powered escrow contracts execute in under a second. No
              waiting periods, no intermediaries.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-24">
        <div className="mx-auto max-w-2xl text-center">
          {!account && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Connect wallet to access</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto py-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Noir OTC</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Institutional-grade OTC trading with zero-knowledge privacy
                and AI-powered risk management.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/create-offer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Create Offer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Risk Disclosure
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Noir OTC. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Built on Solana
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
