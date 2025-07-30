import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { HeaderWrapper } from "@/components/headerWrapper";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Job Genie ",
  description: "You All in One Job Search Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}} >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem disableTransitionOnChange>
          <HeaderWrapper />
          <main className="min-h-screen">{children}</main>
          <footer>
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Job Genie. All rights reserved.
              </p>
            </div>
          </footer>
          
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
