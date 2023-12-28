import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProviders from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Count Buddy",
  description: "Your best pal to count things with",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} prose max-w-none`}>
        <RootProviders>
          <Navbar />
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
