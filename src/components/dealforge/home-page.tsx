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
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";

export function DealforgeHomePage() {
  const { account } = useWalletUi();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <NoirHeader />

      <section className="relative main-section">
      <FlickeringGrid
        className="absolute inset-0"
        squareSize={4}
        gridGap={6}
        flickerChance={1.0}
        color="rgb(70, 70, 70)"
        maxOpacity={0.1}
      />


      {/* Hero Section */}
      <section className="container relative mx-auto py-20 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">
              Live on Solana Mainnet
            </span>
          </div>

          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Noir Meme OTC Trading
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 max-w-[640px] text-lg text-muted-foreground leading-relaxed sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Institutional-grade over-the-counter trading with zero-knowledge
            privacy and AI-powered risk management. Trade large blocks without
            market impact.
          </motion.p>

    {/* Features Section */}
    <section className="container mx-auto pb-12 relative z-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3">
          <div className="group flex items-center gap-3 rounded-full border bg-card/50 backdrop-blur-sm px-4 py-2.5 transition-all hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:from-purple-500/30 group-hover:to-blue-500/30 group-hover:scale-110">
              <Lock className="h-4 w-4 text-primary transition-colors group-hover:text-purple-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold transition-colors group-hover:text-purple-300">Zero-Knowledge Privacy</span>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-purple-400/80">zk-proof verification</span>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-full border bg-card/50 backdrop-blur-sm px-4 py-2.5 transition-all hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:from-pink-500/30 group-hover:to-rose-500/30 group-hover:scale-110">
              <Brain className="h-4 w-4 text-primary transition-colors group-hover:text-pink-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold transition-colors group-hover:text-pink-300">AI Risk Management</span>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-pink-400/80">automated analysis</span>
            </div>
          </div>

          <div className="group flex items-center gap-3 rounded-full border bg-card/50 backdrop-blur-sm px-4 py-2.5 transition-all hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/20">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:from-yellow-500/30 group-hover:to-orange-500/30 group-hover:scale-110">
              <Zap className="h-4 w-4 text-primary transition-colors group-hover:text-yellow-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold transition-colors group-hover:text-yellow-300">Instant Settlement</span>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-yellow-400/80">&lt;1s execution</span>
            </div>
          </div>
        </div>
      </section>


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
                  className="group inline-flex items-center gap-2"
                  variant="outline"
                >
                  <Link href="/dashboard">
                    <Search className="h-4 w-4" />
                    <span>Browse Deals</span>
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild className="group inline-flex items-center gap-2">
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
          <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 backdrop-blur-sm px-4 py-3 transition-all hover:bg-card/90 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Volume</span>
              <div className="text-2xl font-bold bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent">$2.4M</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                <span className="text-emerald-400">↑</span>
                <span>+20.1%</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5">this month</span>
            </div>
          </div>

          <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 backdrop-blur-sm px-4 py-3 transition-all hover:bg-card/90 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Active Offers</span>
              <div className="text-2xl font-bold bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">1,248</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                <span className="text-blue-400">↑</span>
                <span>+12.5%</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5">this week</span>
            </div>
          </div>

          <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 backdrop-blur-sm px-4 py-3 transition-all hover:bg-card/90 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Settlement Time</span>
              <div className="text-2xl font-bold bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">&lt;1s</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs text-purple-500 font-medium">
                <span className="text-purple-400">✓</span>
                <span>99.9%</span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5">success rate</span>
            </div>
          </div>
        </div>
      </section>

      </section>

  
      {/* Join the Degens Section */}
      <section className="container relative z-10 mx-auto py-20">
        <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-4 font-bold text-5xl tracking-tight sm:text-6xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Degens
            </span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Connect with the most active memecoin trading community on Solana.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Twitter Card */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.243-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.496 5.853L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg>
              </div>
              <CardTitle className="font-bold text-xl">Twitter</CardTitle>
              <p className="text-muted-foreground text-sm">@meme_otc</p>
              <Button asChild className="group" variant="ghost">
                <a
                  href="https://twitter.com/meme_otc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Join Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Telegram Card */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </div>
              <CardTitle className="font-bold text-xl">Telegram</CardTitle>
              <p className="text-muted-foreground text-sm">t.me/meme_otc</p>
              <Button asChild className="group" variant="ghost">
                <a
                  href="https://t.me/meme_otc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Join Community
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Most Traded Tokens Card */}
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <CardTitle className="font-bold text-xl">
                Most Traded Tokens
              </CardTitle>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
              <p className="text-muted-foreground text-xs">
                Real trading data will appear here once the platform goes live
              </p>
            </CardContent>
          </Card>

          {/* Biggest OTC Buys Card */}
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <CardTitle className="font-bold text-xl">
                Biggest OTC Buys
              </CardTitle>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
              <p className="text-muted-foreground text-xs">
                Top traders will be featured here once deals are completed
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How MemeOTC Works Section */}
      <section className="container relative z-10 mx-auto py-20">
        <div className="mx-auto mb-12 flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-4 font-bold text-4xl tracking-tight sm:text-5xl">
            How Noir Works
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Three simple steps to privately exchange any Solana memecoin with
            zero slippage, no front-running, and full escrow protection.
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {/* Card 1: Create Your Listing */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <span className="font-bold text-2xl">01</span>
              </div>
              <CardTitle className="font-bold text-xl">
                Create Your Listing
              </CardTitle>
            </CardContent>
          </Card>

          {/* Card 2: Escrow Protection */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="font-bold text-xl">
                Escrow Protection
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Once a buyer accepts, funds are locked in a smart contract.
                Neither party can rug — guaranteed.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Settle Instantly */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-4 p-8 text-center">
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
          <CardContent className="flex flex-col items-center space-y-6 p-8 text-center">
            <p className="max-w-2xl text-base text-muted-foreground">
              Specify your SPL token, amount, and asking price in SOL. Your
              offer is now live for OTC buyers.
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
              <h3 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text font-bold text-3xl text-transparent">
                Noir
              </h3>
              <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                A peer-to-peer OTC desk for Solana memecoins. List tokens, set
                your price, and settle directly with buyers.
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/30 transition-colors hover:border-foreground/50"
                  type="button"
                >
                  <Heart className="h-5 w-5 text-muted-foreground" />
                </button>
                <a
                  aria-label="Join our Telegram community"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-foreground/30 transition-colors hover:border-foreground/50"
                  href="https://t.me/meme_otc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Join our Telegram community</span>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="https://t.me/meme_otc"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="https://twitter.com/meme_otc"
                    rel="noopener noreferrer"
                    target="_blank"
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
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} Noir. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground text-xs">
                <span className="transition-colors hover:text-foreground">
                  Privacy Policy
                </span>
                <span className="transition-colors hover:text-foreground">
                  Terms of Service
                </span>
                <span className="transition-colors hover:text-foreground">
                  Cookie Policy
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
