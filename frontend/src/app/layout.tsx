import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProviderWrapper } from "@/ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sheetrocket",
  description: "Use spreadsheet as a CMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ProviderWrapper>
        <body className={inter.className}>{children}</body>
      </ProviderWrapper>
    </html>
  );
}
