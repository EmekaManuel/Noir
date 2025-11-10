"use client";

import { useQuery } from "@tanstack/react-query";
import { Address } from "gill";
import { useWalletUi } from "@wallet-ui/react";

interface TokenMetadata {
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

// Well-known tokens (for better UX)
const KNOWN_TOKENS: Record<string, TokenMetadata> = {
  So11111111111111111111111111111111111111112: {
    symbol: "SOL",
    name: "Wrapped SOL",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logoURI: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
  },
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: {
    symbol: "USDT",
    name: "USDT",
    decimals: 6,
  },
};

async function fetchTokenMetadata(
  rpc: any,
  mintAddress: Address
): Promise<TokenMetadata> {
  // Check known tokens first
  const known = KNOWN_TOKENS[mintAddress];
  if (known) return known;

  try {
    // Fetch mint account to get decimals
    const mintAccount = await rpc
      .getAccountInfo(mintAddress, { encoding: "jsonParsed" })
      .send();

    if (!mintAccount.value) {
      throw new Error("Mint account not found");
    }

    const decimals =
      (mintAccount.value.data as any)?.parsed?.info?.decimals ?? 9;

    // For now, return a shortened address as the symbol
    // In production, you'd query metadata programs or token registry
    const shortAddress = `${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`;

    return {
      symbol: shortAddress,
      name: shortAddress,
      decimals,
    };
  } catch (error) {
    console.warn("Failed to fetch token metadata:", error);
    const shortAddress = `${mintAddress.slice(0, 4)}...${mintAddress.slice(-4)}`;
    return {
      symbol: shortAddress,
      name: shortAddress,
      decimals: 9,
    };
  }
}

export function useTokenMetadata(mintAddress: Address | undefined) {
  const { client } = useWalletUi();

  return useQuery({
    queryKey: ["tokenMetadata", mintAddress],
    queryFn: () => {
      if (!mintAddress) throw new Error("No mint address");
      return fetchTokenMetadata(client.rpc, mintAddress);
    },
    enabled: !!mintAddress,
    staleTime: 1000 * 60 * 60, // 1 hour (token metadata rarely changes)
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

// Hook to fetch multiple token metadata at once
export function useTokensMetadata(mintAddresses: (Address | undefined)[]) {
  const { client } = useWalletUi();

  return useQuery({
    queryKey: ["tokensMetadata", ...mintAddresses.filter(Boolean)],
    queryFn: async () => {
      const validAddresses = mintAddresses.filter(
        (addr): addr is Address => !!addr
      );
      const results = await Promise.all(
        validAddresses.map((addr) => fetchTokenMetadata(client.rpc, addr))
      );

      return Object.fromEntries(
        validAddresses.map((addr, i) => [addr, results[i]])
      );
    },
    enabled: mintAddresses.some(Boolean),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}

