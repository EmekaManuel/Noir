"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { address } from "gill";
import { DollarSign, Info, Link2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMakeOfferMutation } from "./dealforge-data-access";

const offerFormSchema = z.object({
  offeredMint: z.string().min(1, "Token mint address is required"),
  offeredAmount: z.coerce
    .number({
      error: "Amount is required",
    })
    .gt(0, "Amount should be greater than 0"),
  requestedMint: z.string().min(1, "Token mint address is required"),
  requestedAmount: z.coerce
    .number({
      error: "Amount is required",
    })
    .gt(0, "Amount should be greater than 0"),
});
type OfferFormData = z.infer<typeof offerFormSchema>;
type OfferFormDataInput = z.input<typeof offerFormSchema>;

interface OfferFormProps {
  readonly onSuccess?: () => void;
}

export function OfferForm({ onSuccess }: OfferFormProps) {
  const { mutate: makeOfferMutation, isPending: isLoading } =
    useMakeOfferMutation();

  const form = useForm<OfferFormDataInput, unknown, OfferFormData>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      offeredMint: "",
      offeredAmount: 0,
      requestedMint: "",
      requestedAmount: 0,
    },
  });

  const watchedValues = form.watch();
  const previewText = useMemo(() => {
    const amount = watchedValues.offeredAmount || 0;
    const requestedAmount = watchedValues.requestedAmount || 0;
    const requestedMint = watchedValues.requestedMint || "";

    if (requestedMint) {
      const shortMint =
        requestedMint.length > 8
          ? `${requestedMint.slice(0, 4)}...${requestedMint.slice(-4)}`
          : requestedMint;
      return `List ${amount} tokens for ${requestedAmount} (${shortMint})`;
    }
    return `List ${amount} tokens for ${requestedAmount}`;
  }, [
    watchedValues.offeredAmount,
    watchedValues.requestedAmount,
    watchedValues.requestedMint,
  ]);

  const onSubmit = (data: OfferFormData) => {
    try {
      // Generate a random offer ID
      const offerId = BigInt(Math.floor(Math.random() * 1_000_000_000_000));

      // Validate addresses
      const offeredMint = address(data.offeredMint);
      const requestedMint = address(data.requestedMint);

      const offeredAmount = data.offeredAmount;
      const requestedAmount = data.requestedAmount;

      makeOfferMutation(
        {
          offerId,
          offeredMint,
          requestedMint,
          offeredAmount,
          requestedAmount,
        },
        {
          onSuccess: () => {
            // Reset form on success
            form.reset();
            onSuccess?.();
          },
        }
      );
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Deal Details Section */}
        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="font-semibold text-xl">
                Deal Details
              </CardTitle>
            </div>
            <CardDescription className="mt-2">
              Create a token swap offer for any Solana tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Token You're Selling Subsection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Token You're Selling</h3>
              </div>

              <FormField
                control={form.control}
                name="offeredMint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Mint Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter token mint address (e.g., 8m38bz481d1du6KD7nhzMfejg31khNDJmTEz1GP7bfp)"
                        {...field}
                        className="bg-muted/50"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the mint address of any Solana token/memecoin you
                      want to sell
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="offeredAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount You're Selling</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0.0"
                        step="0.000000001"
                        type="number"
                        {...field}
                        className="bg-muted/50"
                        disabled={isLoading}
                        value={String(field.value || "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* What You Want in Return Section */}
        <Card className="border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="font-semibold text-xl">
                What You Want in Return
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="requestedMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token You Want in Return</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter token mint address (e.g., So11111111111111111111111111111111111111112 for SOL)"
                      {...field}
                      className="bg-muted/50"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the mint address of the token you want to receive
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requestedAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount You Want</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.0"
                      step="0.000000001"
                      type="number"
                      {...field}
                      className="bg-muted/50"
                      disabled={isLoading}
                      value={String(field.value || "")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Preview */}
            <div className="rounded-md border bg-muted/30 p-3">
              <p className="text-muted-foreground text-sm">
                Preview:{" "}
                <span className="font-medium text-foreground">
                  {previewText}
                </span>
              </p>
            </div>

            {/* Platform Fee Info Box */}
            <Alert className="border-muted bg-muted/50">
              <Info className="h-4 w-4" />
              <AlertTitle className="font-medium">Platform Fee</AlertTitle>
              <AlertDescription className="mt-1">
                Platform fee is currently{" "}
                <span className="font-semibold">0%</span>. Fee structure will be
                implemented soon.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Button className="w-full" disabled={isLoading} size="lg" type="submit">
          {isLoading ? "Creating Offer..." : "Create Offer"}
        </Button>
      </form>
    </Form>
  );
}
