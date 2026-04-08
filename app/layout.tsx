import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { WealthProvider } from "@/hooks/use-wealth-store";

export const metadata: Metadata = {
  title: "eerstep",
  description: "Strategy-based wealth progression system"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <WealthProvider>
          <AppShell>{children}</AppShell>
        </WealthProvider>
      </body>
    </html>
  );
}
