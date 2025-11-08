"use client";

import type React from "react";
import { AccountChecker } from "@/components/account/account-ui";
import { ClusterChecker } from "@/components/cluster/cluster-ui";
import { Toaster } from "./ui/sonner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <AppHeader links={links} /> */}
      <main className="relative flex w-full flex-1 flex-col bg-background">
        <ClusterChecker>
          <AccountChecker />
        </ClusterChecker>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
