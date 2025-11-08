"use client";

import { useWalletUi } from "@wallet-ui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Lock,
  Plus,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { NoirHeader } from "@/components/dealforge/noir-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DealforgeHomePage() {
  const { account } = useWalletUi();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <NoirHeader />

      {/* Hero Section */}
      <section className="container mx-auto relative py-20 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Live on Solana Mainnet</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 font-bold text-5xl tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Private OTC Trading
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 max-w-[640px] text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Institutional-grade over-the-counter trading with zero-knowledge privacy
            and AI-powered risk management. Trade large blocks without market impact.
          </motion.p>

          <div className="flex items-center gap-4">
            {account ? (
              <>
                <Button
                  asChild
                  className="group inline-flex items-center gap-2"
                >
                  <Link href="/dashboard/create-offer">
                    <Plus className="h-4 w-4" />
                    <span>Create Deal</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group inline-flex items-center gap-2"
                >
                  <Link href="/dashboard">
                    <Search className="h-4 w-4" />
                    <span>Browse Deals</span>
                  </Link>
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="group inline-flex items-center gap-2"
              >
                <Link href="/dashboard">
                  <span>Connect wallet to continue</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
            </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto py-12 relative z-10">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          <Card className="group border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg hover:border-primary/20">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">$2.4M</div>
              <div className="mt-2 text-xs text-emerald-500 font-medium">+20.1% this month</div>
            </CardContent>
          </Card>

          <Card className="group border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg hover:border-primary/20">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Active Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">1,248</div>
              <div className="mt-2 text-xs text-emerald-500 font-medium">+12.5% this week</div>
            </CardContent>
          </Card>

          <Card className="group border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg hover:border-primary/20">
            <CardHeader className="space-y-0 pb-3">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Settlement Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">&lt;1s</div>
              <div className="mt-2 text-xs text-emerald-500 font-medium">99.9% success rate</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 relative z-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <Card className="group relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-xl hover:border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">Zero-Knowledge Privacy</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Trade details remain private through zk-proof verification. Prove
                transaction validity without revealing sensitive information.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-xl hover:border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">AI Risk Management</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Automated counterparty analysis and risk assessment. Real-time
                monitoring ensures secure, compliant transactions.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-xl hover:border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl font-semibold">Instant Settlement</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Solana-powered escrow contracts execute in under a second. No
                waiting periods, no intermediaries.
              </p>
            </CardContent>
          </Card>
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
                    Browse Deals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/create-offer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Create Deal
                  </Link>
                </li>
                {account && (
                  <li>
                    <Link
                      href="/dashboard/my-deals"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      My Deals
                    </Link>
                  </li>
                )}
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
