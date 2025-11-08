"use client";

import { useWalletUi } from "@wallet-ui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  ExternalLink,
  Heart,
  Lock,
  Plus,
  Search,
  Shield,
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
            Private Meme OTC Trading
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

      {/* Join the Degens Section */}
      <section className="container mx-auto py-20 relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center mb-12">
          <h2 className="mb-4 font-bold text-5xl tracking-tight sm:text-6xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Degens
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Connect with the most active memecoin trading community on Solana.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Twitter Card */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.243-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.496 5.853L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg>
              </div>
              <CardTitle className="text-xl font-bold">Twitter</CardTitle>
              <p className="text-sm text-muted-foreground">@meme_otc</p>
              <Button
                variant="ghost"
                className="group"
                asChild
              >
                <a
                  href="https://twitter.com/meme_otc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Telegram Card */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </div>
              <CardTitle className="text-xl font-bold">Telegram</CardTitle>
              <p className="text-sm text-muted-foreground">t.me/meme_otc</p>
              <Button
                variant="ghost"
                className="group"
                asChild
              >
                <a
                  href="https://t.me/meme_otc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Most Traded Tokens Card */}
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <CardTitle className="text-xl font-bold">Most Traded Tokens</CardTitle>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
              <p className="text-xs text-muted-foreground">
                Real trading data will appear here once the platform goes live
              </p>
            </CardContent>
          </Card>

          {/* Biggest OTC Buys Card */}
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <CardTitle className="text-xl font-bold">Biggest OTC Buys</CardTitle>
              <p className="text-sm text-muted-foreground">Coming Soon</p>
              <p className="text-xs text-muted-foreground">
                Top traders will be featured here once deals are completed
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How MemeOTC Works Section */}
      <section className="container mx-auto py-20 relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center mb-12">
          <h2 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl">
            How Noir Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Three simple steps to privately exchange any Solana memecoin with zero slippage, no front-running, and full escrow protection.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 mb-12">
          {/* Card 1: Create Your Listing */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <span className="text-2xl font-bold">01</span>
              </div>
              <CardTitle className="text-xl font-bold">Create Your Listing</CardTitle>
            </CardContent>
          </Card>

          {/* Card 2: Escrow Protection */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Escrow Protection</CardTitle>
              <p className="text-sm text-muted-foreground">
                Once a buyer accepts, funds are locked in a smart contract. Neither party can rug — guaranteed.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Settle Instantly */}
          <Card className="border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all hover:shadow-lg">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <Zap className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl font-bold">Settle Instantly</CardTitle>
              <p className="text-sm text-muted-foreground">
                SOL is released to the seller. Tokens are released to the buyer. Private, peer-to-peer. No middlemen.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Section */}
        <Card className="mx-auto max-w-4xl border bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            <p className="text-base text-muted-foreground max-w-2xl">
              Specify your SPL token, amount, and asking price in SOL. Your offer is now live for OTC buyers.
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href="/dashboard/create-offer">
                Create Your First Listing
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left: Brand */}
            <div className="space-y-4">
              <h3 className="font-bold text-3xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                Noir
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-md">
                A peer-to-peer OTC desk for Solana memecoins. List tokens, set your price, and settle directly with buyers.
              </p>
              <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/30 hover:border-foreground/50 transition-colors">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                </button>
                <a
                  href="https://t.me/meme_otc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/30 hover:border-foreground/50 transition-colors"
                >
                  <svg
                    className="h-5 w-5 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Community */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://t.me/meme_otc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/meme_otc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} Noir. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="transition-colors hover:text-foreground"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
