import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen bg-background font-sans antialiased overflow-hidden flex flex-col",
          fontSans.variable
        )}
      >
        <header className="h-auto text-primary-foreground bg-primary p-6">
          <h1 className="text-xl">FinanceFaker - Invoices</h1>
        </header>

        {children}
      </body>
    </html>
  );
}
