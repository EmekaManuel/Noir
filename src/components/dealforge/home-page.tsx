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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";

export function DealforgeHomePage() {
  const { account } = useWalletUi();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      <NoirHeader />

      <section className="main-section relative">
        <FlickeringGrid
          className="absolute inset-0"
          color="rgb(70, 70, 70)"
          flickerChance={1.0}
          gridGap={6}
          maxOpacity={0.1}
          squareSize={4}
        />

        {/* Hero Section */}
        <section className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-xs sm:px-4">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">
                Live on Solana Mainnet
              </span>
            </div>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text px-4 font-bold text-3xl text-transparent tracking-tight sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              Noir Meme OTC Trading
            </motion.h1>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 max-w-[640px] px-4 text-base text-muted-foreground leading-relaxed sm:mb-8 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Institutional-grade over-the-counter trading with zero-knowledge
              privacy and AI-powered risk management. Trade large blocks without
              market impact.
            </motion.p>

            {/* Features Section */}
            <section className="container relative z-10 mx-auto px-4 pb-8 sm:pb-12">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 sm:gap-3">
                <div className="group flex items-center gap-2 rounded-full border bg-card/50 px-3 py-2 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-blue-500/20 hover:shadow-lg hover:shadow-purple-500/20 sm:gap-3 sm:px-4 sm:py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:scale-110 group-hover:from-purple-500/30 group-hover:to-blue-500/30 sm:h-8 sm:w-8">
                    <Lock className="h-3.5 w-3.5 text-primary transition-colors group-hover:text-purple-400 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="font-semibold text-xs transition-colors group-hover:text-purple-300 sm:text-sm">
                      Zero-Knowledge Privacy
                    </span>
                    <span className="text-[10px] text-muted-foreground transition-colors group-hover:text-purple-400/80 sm:text-xs">
                      zk-proof verification
                    </span>
                  </div>
                </div>

                <div className="group flex items-center gap-2 rounded-full border bg-card/50 px-3 py-2 backdrop-blur-sm transition-all hover:border-pink-500/50 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-rose-500/20 hover:shadow-lg hover:shadow-pink-500/20 sm:gap-3 sm:px-4 sm:py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:scale-110 group-hover:from-pink-500/30 group-hover:to-rose-500/30 sm:h-8 sm:w-8">
                    <Brain className="h-3.5 w-3.5 text-primary transition-colors group-hover:text-pink-400 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="font-semibold text-xs transition-colors group-hover:text-pink-300 sm:text-sm">
                      AI Risk Management
                    </span>
                    <span className="text-[10px] text-muted-foreground transition-colors group-hover:text-pink-400/80 sm:text-xs">
                      automated analysis
                    </span>
                  </div>
                </div>

                <div className="group flex items-center gap-2 rounded-full border bg-card/50 px-3 py-2 backdrop-blur-sm transition-all hover:border-yellow-500/50 hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 hover:shadow-lg hover:shadow-yellow-500/20 sm:gap-3 sm:px-4 sm:py-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 transition-all group-hover:scale-110 group-hover:from-yellow-500/30 group-hover:to-orange-500/30 sm:h-8 sm:w-8">
                    <Zap className="h-3.5 w-3.5 text-primary transition-colors group-hover:text-yellow-400 sm:h-4 sm:w-4" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="font-semibold text-xs transition-colors group-hover:text-yellow-300 sm:text-sm">
                      Instant Settlement
                    </span>
                    <span className="text-[10px] text-muted-foreground transition-colors group-hover:text-yellow-400/80 sm:text-xs">
                      &lt;1s execution
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex w-full flex-col items-stretch gap-3 px-4 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              {account ? (
                <>
                  <Button
                    asChild
                    className="group inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                  >
                    <Link href="/dashboard/create-offer">
                      <Plus className="h-4 w-4" />
                      <span>Create Deal</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="group inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                    variant="outline"
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
                  className="group inline-flex w-full items-center justify-center gap-2 sm:w-auto"
                >
                  <Link href="/dashboard">
                    <span className="hidden sm:inline">
                      Connect wallet to continue
                    </span>
                    <span className="sm:hidden">Connect wallet</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="container relative z-10 mx-auto px-4 py-8 sm:py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
            <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 px-3 py-2.5 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-card/90 hover:shadow-emerald-500/10 hover:shadow-lg sm:px-4 sm:py-3">
              <div className="flex flex-col">
                <span className="mb-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider sm:mb-1 sm:text-xs">
                  Total Volume
                </span>
                <div className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text font-bold text-transparent text-xl sm:text-2xl">
                  $2.4M
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 font-medium text-[10px] text-emerald-500 sm:text-xs">
                  <span className="text-emerald-400">↑</span>
                  <span>+20.1%</span>
                </div>
                <span className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">
                  this month
                </span>
              </div>
            </div>

            <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 px-3 py-2.5 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-card/90 hover:shadow-blue-500/10 hover:shadow-lg sm:px-4 sm:py-3">
              <div className="flex flex-col">
                <span className="mb-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider sm:mb-1 sm:text-xs">
                  Active Offers
                </span>
                <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 bg-clip-text font-bold text-transparent text-xl sm:text-2xl">
                  1,248
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 font-medium text-[10px] text-blue-500 sm:text-xs">
                  <span className="text-blue-400">↑</span>
                  <span>+12.5%</span>
                </div>
                <span className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">
                  this week
                </span>
              </div>
            </div>

            <div className="group flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-card/50 px-3 py-2.5 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-card/90 hover:shadow-lg hover:shadow-purple-500/10 sm:col-span-2 sm:px-4 sm:py-3 md:col-span-1">
              <div className="flex flex-col">
                <span className="mb-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider sm:mb-1 sm:text-xs">
                  Settlement Time
                </span>
                <div className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 bg-clip-text font-bold text-transparent text-xl sm:text-2xl">
                  &lt;1s
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 font-medium text-[10px] text-purple-500 sm:text-xs">
                  <span className="text-purple-400">✓</span>
                  <span>99.9%</span>
                </div>
                <span className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">
                  success rate
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Join the Degens Section */}
      <section className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center sm:mb-12">
          <h2 className="mb-3 px-4 font-bold text-3xl tracking-tight sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
            Join the{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Degens
            </span>
          </h2>
          <p className="max-w-2xl px-4 text-base text-muted-foreground sm:text-lg">
            Connect with the most active memecoin trading community on Solana.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {/* Twitter Card */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.243-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.496 5.853L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                </svg>
              </div>
              <CardTitle className="font-bold text-lg sm:text-xl">
                Twitter
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                @meme_otc
              </p>
              <Button
                asChild
                className="group w-full sm:w-auto"
                variant="ghost"
              >
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
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                </svg>
              </div>
              <CardTitle className="font-bold text-lg sm:text-xl">
                Telegram
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                t.me/meme_otc
              </p>
              <Button
                asChild
                className="group w-full sm:w-auto"
                variant="ghost"
              >
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
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <CardTitle className="font-bold text-lg sm:text-xl">
                Most Traded Tokens
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Coming Soon
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Real trading data will appear here once the platform goes live
              </p>
            </CardContent>
          </Card>

          {/* Biggest OTC Buys Card */}
          <Card className="border bg-card/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <CardTitle className="font-bold text-lg sm:text-xl">
                Biggest OTC Buys
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Coming Soon
              </p>
              <p className="text-[10px] text-muted-foreground sm:text-xs">
                Top traders will be featured here once deals are completed
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How MemeOTC Works Section */}
      <section className="container relative z-10 mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto mb-8 flex max-w-4xl flex-col items-center text-center sm:mb-12">
          <h2 className="mb-3 px-4 font-bold text-2xl tracking-tight sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            How Noir Works
          </h2>
          <p className="max-w-2xl px-4 text-base text-muted-foreground sm:text-lg">
            Three simple steps to privately exchange any Solana memecoin with
            zero slippage, no front-running, and full escrow protection.
          </p>
        </div>

        <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-4 sm:mb-12 sm:gap-6 md:grid-cols-3">
          {/* Card 1: Create Your Listing */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16">
                <span className="font-bold text-xl sm:text-2xl">01</span>
              </div>
              <CardTitle className="font-bold text-lg sm:text-xl">
                Create Your Listing
              </CardTitle>
            </CardContent>
          </Card>

          {/* Card 2: Escrow Protection */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <CardTitle className="font-bold text-lg sm:text-xl">
                Escrow Protection
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Once a buyer accepts, funds are locked in a smart contract.
                Neither party can rug — guaranteed.
              </p>
            </CardContent>
          </Card>

          {/* Card 3: Settle Instantly */}
          <Card className="border bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
            <CardContent className="flex flex-col items-center space-y-3 p-6 text-center sm:space-y-4 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <CardTitle className="font-bold text-lg sm:text-xl">
                Settle Instantly
              </CardTitle>
              <p className="text-muted-foreground text-xs sm:text-sm">
                SOL is released to the seller. Tokens are released to the buyer.
                Private, peer-to-peer. No middlemen.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Section */}
        <Card className="mx-auto max-w-4xl border bg-card/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center space-y-4 p-6 text-center sm:space-y-6 sm:p-8">
            <p className="max-w-2xl px-4 text-muted-foreground text-sm sm:text-base">
              Specify your SPL token, amount, and asking price in SOL. Your
              offer is now live for OTC buyers.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 sm:w-auto"
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
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
            {/* Left: Brand */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text font-bold text-2xl text-transparent sm:text-3xl">
                Noir
              </h3>
              <p className="max-w-md text-muted-foreground text-xs leading-relaxed sm:text-sm">
                A peer-to-peer OTC desk for Solana memecoins. List tokens, set
                your price, and settle directly with buyers.
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-muted-foreground/30 transition-colors hover:border-foreground/50 sm:h-10 sm:w-10"
                  type="button"
                >
                  <Heart className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" />
                </button>
                <a
                  aria-label="Join our Telegram community"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-muted-foreground/30 transition-colors hover:border-foreground/50 sm:h-10 sm:w-10"
                  href="https://t.me/meme_otc"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Join our Telegram community</span>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Community */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-base sm:text-lg">Community</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
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
          <div className="mt-8 border-t pt-6 sm:mt-12 sm:pt-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
              <p className="text-center text-[10px] text-muted-foreground sm:text-left sm:text-xs">
                © {new Date().getFullYear()} Noir. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-muted-foreground sm:gap-4 sm:text-xs">
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Privacy Policy
                </span>
                <span className="cursor-pointer transition-colors hover:text-foreground">
                  Terms of Service
                </span>
                <span className="cursor-pointer transition-colors hover:text-foreground">
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
