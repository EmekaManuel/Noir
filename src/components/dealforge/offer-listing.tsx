"use client";

import { OFFER_DISCRIMINATOR, type Offer } from "@project/anchor";
import { ellipsify, useWalletUi } from "@wallet-ui/react";
import type { Account, Address, Base64EncodedBytes } from "gill";
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useMemo, useState } from "react";
import { ExplorerLink } from "@/components/cluster/cluster-ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  useDealforgeProgramId,
  useOffersPaginated,
  useProgramAccounts,
  useRefundOfferMutation,
  useTakeOfferMutation,
} from "./dealforge-data-access";

interface OfferDetailsProps {
  readonly offer: { pubkey: Address; account: Account<Offer> };
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
}

function OfferDetails({ offer, open, onOpenChange }: OfferDetailsProps) {
  const { account } = useWalletUi();
  const takeOfferMutation = useTakeOfferMutation();
  const refundOfferMutation = useRefundOfferMutation();

  const isOwner = account?.address === offer.account.data.maker;
  const offerId = offer.account.data.id;

  const formatAmount = (amount: bigint) => {
    const DECIMALS = 1_000_000_000n;
    return (Number(amount) / Number(DECIMALS)).toFixed(9);
  };

  const handleTakeOffer = async () => {
    await takeOfferMutation.mutateAsync({
      offer: offer.account,
      offeredMint: offer.account.data.offeredMint,
      requestedMint: offer.account.data.requestedMint,
    });
    onOpenChange(false);
  };

  const handleRefundOffer = async () => {
    await refundOfferMutation.mutateAsync({
      offerId,
      offeredMint: offer.account.data.offeredMint,
    });
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="max-h-[90vh] max-w-2xl overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogTitle className="font-bold text-2xl">
                Offer Details
              </DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                <span className="text-muted-foreground">ID:</span>
                <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
                  {offerId.toString()}
                </code>
              </DialogDescription>
            </div>
            {isOwner && (
              <Badge className="font-medium text-xs" variant="secondary">
                Your Offer
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Token Exchange Display */}
          <div className="space-y-4">
            {/* Offered Token Pill */}
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">
                {isOwner ? "You're offering" : "They're offering"}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-base text-emerald-600 dark:text-emerald-400">
                    {formatAmount(offer.account.data.offeredAmount)}
                  </span>
                </div>
                <div className="rounded-full bg-muted px-3 py-1.5">
                  <ExplorerLink
                    address={offer.account.data.offeredMint.toString()}
                    className="font-mono text-muted-foreground text-xs"
                    label={ellipsify(
                      offer.account.data.offeredMint.toString(),
                      8
                    )}
                  />
                  <ExternalLink className="ml-1.5 inline h-3 w-3" />
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center py-1">
              <ArrowDown className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Requested Token Pill */}
            <div className="space-y-2">
              <div className="font-medium text-muted-foreground text-sm">
                In exchange for
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-base text-blue-600 dark:text-blue-400">
                    {formatAmount(offer.account.data.requestedAmount)}
                  </span>
                </div>
                <div className="rounded-full bg-muted px-3 py-1.5">
                  <ExplorerLink
                    address={offer.account.data.requestedMint.toString()}
                    className="font-mono text-muted-foreground text-xs"
                    label={ellipsify(
                      offer.account.data.requestedMint.toString(),
                      8
                    )}
                  />
                  <ExternalLink className="ml-1.5 inline h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Maker Information */}
          <div className="space-y-2">
            <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
              Maker
            </h3>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-muted px-3 py-1.5">
                <ExplorerLink
                  address={offer.account.data.maker.toString()}
                  className="font-mono text-sm"
                  label={ellipsify(offer.account.data.maker.toString())}
                />
                <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {isOwner ? (
              <Button
                className="w-full sm:w-auto"
                disabled={refundOfferMutation.isPending}
                onClick={handleRefundOffer}
                variant="destructive"
              >
                {refundOfferMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refunding...
                  </>
                ) : (
                  "Refund Offer"
                )}
              </Button>
            ) : (
              <Button
                className="w-full sm:w-auto"
                disabled={takeOfferMutation.isPending}
                onClick={handleTakeOffer}
              >
                {takeOfferMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Taking Offer...
                  </>
                ) : (
                  "Take Offer"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface OfferCardProps {
  readonly offer: { pubkey: Address; account: Account<Offer> };
  readonly onClick: () => void;
}

function OfferCard({ offer, onClick }: OfferCardProps) {
  const { account } = useWalletUi();
  const isOwner = account?.address === offer.account.data.maker;

  const formatAmount = (amount: bigint) => {
    const DECIMALS = 1_000_000_000n;
    return (Number(amount) / Number(DECIMALS)).toFixed(4);
  };

  return (
    <Card
      className="group cursor-pointer border bg-card transition-all hover:border-primary/50 hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge
              className="rounded-full font-medium text-xs"
              variant={isOwner ? "secondary" : "outline"}
            >
              {isOwner ? "Your Offer" : `#${offer.account.data.id.toString()}`}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground text-xs transition-colors group-hover:text-foreground">
              <span>View</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* Offered Token Pill */}
            <div className="space-y-1.5">
              <div className="font-medium text-muted-foreground text-xs">
                {isOwner ? "You're offering" : "They're offering"}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-emerald-600 text-sm dark:text-emerald-400">
                    {formatAmount(offer.account.data.offeredAmount)}
                  </span>
                </div>
                <div className="rounded-full bg-muted px-2.5 py-1">
                  <span className="font-mono text-muted-foreground text-xs">
                    {ellipsify(offer.account.data.offeredMint.toString(), 6)}
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center py-0.5">
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Requested Token Pill */}
            <div className="space-y-1.5">
              <div className="font-medium text-muted-foreground text-xs">
                In exchange for
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-blue-600 text-sm dark:text-blue-400">
                    {formatAmount(offer.account.data.requestedAmount)}
                  </span>
                </div>
                <div className="rounded-full bg-muted px-2.5 py-1">
                  <span className="font-mono text-muted-foreground text-xs">
                    {ellipsify(offer.account.data.requestedMint.toString(), 6)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t pt-2">
            <span className="text-muted-foreground text-xs">Maker:</span>
            <div className="rounded-full bg-muted px-2.5 py-0.5">
              <span className="font-mono text-foreground text-xs">
                {ellipsify(offer.account.data.maker.toString(), 6)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface OfferListingProps {
  readonly filterByMaker?: string;
}

export function OfferListing({ filterByMaker }: OfferListingProps = {}) {
  const programId = useDealforgeProgramId();
  const { accounts, isLoading: addressesLoading } = useProgramAccounts({
    program: programId,
    config: {
      dataSlice: { offset: 0, length: 0 },
      filters: [
        {
          memcmp: {
            offset: 0n,
            encoding: "base64",
            bytes: Array.from(
              OFFER_DISCRIMINATOR
            ) as unknown as Base64EncodedBytes,
          },
        },
      ],
    },
  });

  const accountsAddress = useMemo(
    () => accounts?.map((a) => a.pubkey) ?? [],
    [accounts]
  );

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching: isOfferFetching,
    isFetchingNextPage,
    isLoading,
  } = useOffersPaginated(accountsAddress);

  // Only show loading if we don't have any cached data
  const isFetching = (isOfferFetching || addressesLoading) && !data;

  const [selectedOffer, setSelectedOffer] = useState<{
    pubkey: Address;
    account: Account<Offer>;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const allOffers = useMemo(() => {
    const offers = data?.pages.flat() || [];
    if (filterByMaker) {
      return offers.filter(
        (offer) => offer.account.data.maker.toString() === filterByMaker
      );
    }
    return offers;
  }, [data, filterByMaker]);

  const handleOfferClick = (offer: {
    pubkey: Address;
    account: Account<Offer>;
  }) => {
    setSelectedOffer(offer);
    setDialogOpen(true);
  };

  // Show loading only if we have no data at all
  if (isLoading && !data) {
    return (
      <Card className="border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <div className="text-center">
              <div className="font-medium text-foreground">
                Loading offers...
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Fetching from the blockchain
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="font-semibold text-destructive">
              Error loading offers
            </div>
            <div className="mt-2 text-muted-foreground text-sm">
              {error instanceof Error ? error.message : "Unknown error"}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (allOffers.length === 0) {
    return (
      <Card className="border bg-card/50 backdrop-blur-sm">
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <RefreshCw className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="font-semibold text-foreground">No offers found</div>
            <div className="mt-2 text-muted-foreground text-sm">
              Be the first to create an offer!
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        {allOffers.map((offer) => (
          <OfferCard
            key={offer.pubkey.toString()}
            offer={offer}
            onClick={() => handleOfferClick(offer)}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center pt-4">
          <Button
            className="min-w-[160px]"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            variant="outline"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more...
              </>
            ) : (
              "Load More Offers"
            )}
          </Button>
        </div>
      )}

      {isFetching && !isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <div className="text-muted-foreground text-sm">Refreshing...</div>
        </div>
      )}

      {selectedOffer && (
        <OfferDetails
          offer={selectedOffer}
          onOpenChange={setDialogOpen}
          open={dialogOpen}
        />
      )}
    </div>
  );
}
