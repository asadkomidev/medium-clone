import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Container from "@/components/container";
import Navbar from "@/modules/shared/navbar/navbar";
import { auth } from "../../../auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next auth starter",
  description: "Built by Asadkomi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Container>
              <Navbar />
              <main className="min-h-[80vh]">{children}</main>
              <Toaster expand={true} position="top-right" />
            </Container>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
