"use client";

import { Address } from "gill";
import { ExternalLink } from "lucide-react";
import { ExplorerLink } from "../cluster/cluster-ui";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTokenMetadata } from "./use-token-metadata";
import { cn } from "@/lib/utils";

interface TokenDisplayProps {
  address: Address;
  className?: string;
  showExternalLink?: boolean;
}

export function TokenDisplay({
  address,
  className,
  showExternalLink = false,
}: TokenDisplayProps) {
  const { data: metadata, isLoading } = useTokenMetadata(address);

  if (isLoading) {
    return (
      <span className={cn("animate-pulse text-muted-foreground", className)}>
        Loading...
      </span>
    );
  }

  const displayText = metadata?.symbol || `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("cursor-help", className)}>
            {displayText}
            {showExternalLink && (
              <ExternalLink className="ml-1 inline h-3 w-3" />
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <div className="font-semibold">{metadata?.name || "Unknown Token"}</div>
            <div className="font-mono text-muted-foreground text-xs">
              {address}
            </div>
            <ExplorerLink
              address={address}
              label="View on Explorer"
              className="text-primary text-xs"
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Simpler inline version without tooltip
export function TokenSymbol({ address }: { address: Address }) {
  const { data: metadata } = useTokenMetadata(address);
  return (
    <span className="font-medium">
      {metadata?.symbol || `${address.slice(0, 4)}...${address.slice(-4)}`}
    </span>
  );
}

