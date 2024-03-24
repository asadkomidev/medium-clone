import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AccountSidebarLayout from "@/modules/shared/sidebar/sidebar-layout";
import Container from "@/components/container";
import Navbar from "@/modules/shared/navbar/navbar";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next auth starter",
  description: "Built by Asadkomi",
};

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
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
              <AccountSidebarLayout>{children}</AccountSidebarLayout>
            </Container>
            <Toaster expand={true} position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
