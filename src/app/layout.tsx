import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreWrapper from "@/core/StoreWrapper";

const inter = Inter({ subsets: ["latin"], fallback: ["Roboto", "sans-serif"] });

export const metadata: Metadata = {
  title: "Easy Order",
  description: "Simplify Your Order Process with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <StoreWrapper>{children}</StoreWrapper>
      </body>
    </html>
  );
}
