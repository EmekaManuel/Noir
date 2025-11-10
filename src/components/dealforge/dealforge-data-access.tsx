import {
  fetchAllOffer,
  fetchOffer,
  getDealforgeProgramId,
  getMakeOfferInstructionAsync,
  getRefundOfferInstructionAsync,
  getTakeOfferInstructionAsync,
  type Offer,
  SEEDS,
} from "@project/anchor";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { type SolanaCluster, useWalletUi } from "@wallet-ui/react";
import {
  type Account,
  type Address,
  type Base58EncodedBytes,
  type GetProgramAccountsApi,
  getAddressEncoder,
  getBytesEncoder,
  getProgramDerivedAddress,
  getU64Encoder,
  getUtf8Encoder,
  type Lamports,
  type ProgramDerivedAddress,
  type Rpc,
  type Simplify,
  type SolanaRpcApi,
} from "gill";
import {
  fetchMint,
  getAssociatedTokenAccountAddress,
  TOKEN_2022_PROGRAM_ADDRESS,
} from "gill/programs";
import type { GillUseRpcHook } from "node_modules/@gillsdk/react/dist/hooks/types";
import { useMemo } from "react";
import { toast } from "sonner";
import { useWalletTransactionSignAndSend } from "@/components/solana/use-wallet-transaction-sign-and-send";
import { useWalletUiSigner } from "@/components/solana/use-wallet-ui-signer";
import { toastTx } from "@/components/toast-tx";

export function useDealforgeProgramId() {
  const { cluster } = useWalletUi();

  return useMemo(() => getDealforgeProgramId(cluster.id), [cluster]);
}

const QueryKeys = {
  all: () => ["all"],
  getProgramAccount: (cluster: SolanaCluster) => [
    ...QueryKeys.all(),
    "get-program-account",
    { cluster },
  ],
  offersList: (cluster: SolanaCluster) => [
    ...QueryKeys.all(),
    "offers-list",
    { cluster },
  ],
  offerListProgramAddresses: ({
    cluster,
    program,
  }: {
    cluster: SolanaCluster;
    program: string | Address;
  }) => [...QueryKeys.offersList(cluster), "program-accounts", { program }],
  offerDetails: ({
    cluster,
    maker,
    offerId,
  }: {
    cluster: SolanaCluster;
    maker: Address | null;
    offerId: number | bigint | null;
  }) => [...QueryKeys.all(), "offer-details", { maker, offerId, cluster }],
};

export function useGetProgramAccountQuery() {
  const { client, cluster } = useWalletUi();

  return useQuery({
    queryKey: QueryKeys.getProgramAccount(cluster),
    queryFn: () =>
      client.rpc.getAccountInfo(getDealforgeProgramId(cluster.id)).send(),
  });
}

// Utility functions for PDA derivation
export function getOfferPDA({
  cluster,
  maker,
  offerId,
}: {
  cluster: SolanaCluster;
  maker: Address;
  offerId: bigint;
}): Promise<ProgramDerivedAddress> {
  return getProgramDerivedAddress({
    programAddress: getDealforgeProgramId(cluster.id), // This should be dynamic based on cluster
    seeds: [
      getBytesEncoder().encode(getUtf8Encoder().encode(SEEDS.OFFER_SEED)),
      getAddressEncoder().encode(maker),
      getU64Encoder().encode(offerId),
    ],
  });
}

export function getVaultAddress(
  tokenMint: Address,
  offer: Address
): Promise<Address> {
  return getAssociatedTokenAccountAddress(
    tokenMint,
    offer,
    TOKEN_2022_PROGRAM_ADDRESS
  );
}

/** TODO: Refactor */
type Encoding = "base64" | "jsonParsed" | "base64+zstd";

type RpcConfig = Simplify<
  Parameters<GetProgramAccountsApi["getProgramAccounts"]>[1] &
    Readonly<{
      encoding?: Encoding;
    }>
>;

type UseProgramAccountsInput<TConfig extends RpcConfig = RpcConfig> =
  GillUseRpcHook<TConfig> & {
    /**
     * Address of the program used to call
     * [`getProgramAccounts`](https://solana.com/docs/rpc/http/getprogramaccounts)
     */
    program: Address | string;
  };

export function useProgramAccounts<TConfig extends RpcConfig = RpcConfig>({
  config,
  abortSignal,
  program,
}: UseProgramAccountsInput<TConfig>) {
  const { client, cluster } = useWalletUi();

  const { data, ...rest } = useQuery({
    enabled: !!program,
    queryKey: QueryKeys.offerListProgramAddresses({ cluster, program }),
    queryFn: async () =>
      client.rpc
        .getProgramAccounts(program as Address, config)
        .send({ abortSignal }),
    staleTime: 30_000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  return {
    ...rest,
    accounts: data as
      | Readonly<{
          account: Readonly<{
            executable: boolean;
            lamports: Lamports;
            owner: Address;
            rentEpoch: bigint;
            space: bigint;
          }> &
            Readonly<{
              data: Base58EncodedBytes;
            }>;
          pubkey: Address;
        }>[]
      | undefined,
  };
}

/** TODO: Refactor */

const PAGE_SIZE = 50; // Increased from 20 to 50 for faster initial load

export async function fetchOffersPage(
  rpc: Rpc<SolanaRpcApi>,
  addresses: Address[],
  pageParam = 0
) {
  // Calculate slice boundaries
  const start = pageParam * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Get the subset of addresses for this page
  const pageAddresses = addresses.slice(start, end);

  if (pageAddresses.length === 0) {
    return [];
  }

  // Decode with Gill SDK - fetchAllOffer should handle parallel fetching
  try {
    const decoded = await fetchAllOffer(rpc, pageAddresses);
    return decoded.map((offer, i) => ({
      pubkey: pageAddresses[i],
      account: offer,
    }));
  } catch (error) {
    // If fetchAllOffer fails (e.g., old offer format), try fetching individually
    console.warn('Batch fetch failed, fetching offers individually...', error);
    
    const offers = await Promise.allSettled(
      pageAddresses.map((addr) => fetchOffer(rpc, addr))
    );
    
    return offers
      .map((result, i) => {
        if (result.status === 'fulfilled') {
          return {
            pubkey: pageAddresses[i],
            account: result.value,
          };
        } else {
          console.warn(`Skipping incompatible offer at ${pageAddresses[i]}`);
          return null;
        }
      })
      .filter((offer): offer is NonNullable<typeof offer> => offer !== null);
  }
}

export function useOffersPaginated(addresses: Address[]) {
  const { client, cluster } = useWalletUi();

  return useInfiniteQuery({
    queryKey: [...QueryKeys.offersList(cluster), addresses.length],
    queryFn: async ({ pageParam }) => {
      // pageParam is the "before" cursor
      const results = await fetchOffersPage(client.rpc, addresses, pageParam);
      return results;
    },
    getNextPageParam: (_lastPage, allPages) => {
      const loadedCount = allPages.flat().length;
      return loadedCount < addresses.length ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: addresses.length > 0,
    staleTime: 30_000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });
}

// Hook to fetch a specific offer
export function useOfferQuery(maker: Address | null, offerId: bigint | null) {
  const { client, cluster } = useWalletUi();

  return useQuery({
    queryKey: QueryKeys.offerDetails({ cluster, maker, offerId }),
    queryFn: async () => {
      if (!maker || offerId === null) return null;
      const [offerAddress] = await getOfferPDA({ cluster, maker, offerId });
      return fetchOffer(client.rpc, offerAddress);
    },
    enabled: !!maker && offerId !== null && offerId !== undefined,
  });
}

// Hook to make an offer
export function useMakeOfferMutation() {
  const txSigner = useWalletUiSigner();
  const signAndSend = useWalletTransactionSignAndSend();
  const queryClient = useQueryClient();
  const { client } = useWalletUi();

  return useMutation({
    mutationFn: async ({
      offerId,
      offeredMint,
      requestedMint,
      offeredAmount,
      requestedAmount,
      allowPartial,
    }: {
      offerId: bigint;
      offeredMint: Address;
      requestedMint: Address;
      offeredAmount: number;
      requestedAmount: number;
      allowPartial: boolean;
    }) => {
      if (!txSigner.address) {
        throw new Error("Wallet not connected");
      }

      const [offeredMintAccount, requestedMintAccount] = await Promise.all([
        fetchMint(client.rpc, offeredMint),
        fetchMint(client.rpc, requestedMint),
      ]);
      if (!offeredMintAccount?.data) {
        throw new Error("Invalid offered Mint");
      }

      if (!requestedMintAccount?.data) {
        throw new Error("Invalid requested Mint");
      }

      const instruction = await getMakeOfferInstructionAsync({
        id: offerId,
        offeredMint,
        offeredAmount: BigInt(
          Math.floor(offeredAmount * 10 ** offeredMintAccount.data.decimals)
        ),
        requestedMint,
        requestedAmount: BigInt(
          Math.floor(requestedAmount * 10 ** requestedMintAccount.data.decimals)
        ),
        allowPartial,
        maker: txSigner,
        tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
      });

      return await signAndSend(instruction, txSigner);
    },
    onSuccess: (signature) => {
      toast.success("Offer created successfully!");
      toastTx(signature);
      // Invalidate and refetch offers query
      queryClient.invalidateQueries({
        queryKey: QueryKeys.all(),
      });
    },
    onError: (error) => {
      let message = "Failed to create offer";
      
      if (error instanceof Error) {
        const errorStr = error.message;
        
        // Parse specific error codes for user-friendly messages
        if (errorStr.includes("0x1770") || errorStr.includes("InsufficientBalance")) {
          message = "Insufficient token balance. You don't have enough tokens to create this offer.";
        } else if (errorStr.includes("0x1778") || errorStr.includes("InvalidOfferedMintAmount")) {
          message = "Invalid offered amount. Amount must be greater than zero.";
        } else if (errorStr.includes("0x1779") || errorStr.includes("InvalidRequestedMintAmount")) {
          message = "Invalid requested amount. Amount must be greater than zero.";
        } else if (errorStr.includes("Invalid offered Mint")) {
          message = "Invalid token address. Please check the offered token mint address.";
        } else if (errorStr.includes("Invalid requested Mint")) {
          message = "Invalid token address. Please check the requested token mint address.";
        } else if (errorStr.includes("User rejected")) {
          message = "Transaction cancelled";
        } else {
          message = errorStr;
        }
      }
      
      toast.error(message, {
        duration: 5000,
      });
    },
  });
}

// Hook for taking offers
export function useTakeOfferMutation() {
  const txSigner = useWalletUiSigner();
  const signAndSend = useWalletTransactionSignAndSend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      offer,
      offeredMint,
      requestedMint,
      takeAmount,
    }: {
      offer: Account<Offer, string>;
      offeredMint: Address;
      requestedMint: Address;
      takeAmount?: bigint; // Optional: defaults to full amount
    }) => {
      if (!txSigner) throw new Error("Wallet not connected");

      const takerOfferedAta = await getAssociatedTokenAccountAddress(
        offeredMint,
        txSigner.address,
        TOKEN_2022_PROGRAM_ADDRESS
      );
      const takerRequestedAta = await getAssociatedTokenAccountAddress(
        requestedMint,
        txSigner.address,
        TOKEN_2022_PROGRAM_ADDRESS
      );

      // Use specified takeAmount or full offer amount if not specified
      const amountToTake = takeAmount ?? offer.data.offeredAmount;

      const instruction = await getTakeOfferInstructionAsync({
        maker: offer.data.maker,
        taker: txSigner,
        offeredMint: offer.data.offeredMint,
        requestedMint: offer.data.requestedMint,
        takerOfferedAta,
        takerRequestedAta,
        offer: offer.address,
        takeAmount: amountToTake,
        tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
      });

      return await signAndSend(instruction, txSigner);
    },
    onSuccess: (signature) => {
      toast.success("Offer taken successfully!");
      toastTx(signature);
      queryClient.invalidateQueries({
        queryKey: QueryKeys.all(),
      });
    },
    onError: (error) => {
      let message = "Failed to take offer";
      
      if (error instanceof Error) {
        const errorStr = error.message;
        
        // Parse specific error codes for user-friendly messages
        if (errorStr.includes("0x1770") || errorStr.includes("InsufficientBalance")) {
          message = "Insufficient token balance. You don't have enough tokens to complete this trade. Try reducing the amount using the slider.";
        } else if (errorStr.includes("0x177b") || errorStr.includes("PartialFillsNotAllowed")) {
          message = "This offer requires taking the full amount. Partial fills are not allowed.";
        } else if (errorStr.includes("0x177c") || errorStr.includes("InvalidTakeAmount")) {
          message = "Invalid amount. Please enter a valid amount greater than zero.";
        } else if (errorStr.includes("0x177d") || errorStr.includes("ExceedsOfferAmount")) {
          message = "Amount exceeds available offer. Please reduce the amount.";
        } else if (errorStr.includes("User rejected")) {
          message = "Transaction cancelled by user";
        } else {
          message = errorStr;
        }
      }
      
      toast.error(message, {
        duration: 5000,
      });
    },
  });
}

// Hook for refunding offers
export function useRefundOfferMutation() {
  const { cluster } = useWalletUi();
  const txSigner = useWalletUiSigner();
  const signAndSend = useWalletTransactionSignAndSend();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      offerId,
      offeredMint,
    }: {
      offerId: bigint;
      offeredMint: Address;
    }) => {
      if (!txSigner) throw new Error("Wallet not connected");

      const [offer] = await getOfferPDA({
        cluster,
        maker: txSigner.address,
        offerId,
      });

      const instruction = await getRefundOfferInstructionAsync({
        maker: txSigner,
        offeredMint,
        offer,
        tokenProgram: TOKEN_2022_PROGRAM_ADDRESS,
      });

      return await signAndSend(instruction, txSigner);
    },
    onSuccess: (signature) => {
      toast.success("Offer refunded successfully!");
      toastTx(signature);
      queryClient.invalidateQueries({
        queryKey: QueryKeys.all(),
      });
    },
    onError: (error) => {
      let message = "Failed to refund offer";
      
      if (error instanceof Error) {
        const errorStr = error.message;
        
        // Parse specific error codes for user-friendly messages
        if (errorStr.includes("User rejected")) {
          message = "Transaction cancelled";
        } else if (errorStr.includes("not found") || errorStr.includes("does not exist")) {
          message = "Offer not found or already closed";
        } else {
          message = errorStr;
        }
      }
      
      toast.error(message, {
        duration: 5000,
      });
    },
  });
}
