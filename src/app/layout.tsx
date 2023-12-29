import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootProviders from "@/components/Providers";
import Navbar from "@/components/Navbar";
import RedirectRoot from "@/components/Redirects/RedirectRoot";
import { userSanitizer } from "@/utils/user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Count Buddy",
  description: "Your best pal to count things with",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSanitized = await userSanitizer();

  return (
    <html lang="en">
      <body className={`${inter.className} prose max-w-none`}>
        <RootProviders>
          <Navbar />
          <RedirectRoot userSanitized={userSanitized}>{children}</RedirectRoot>
        </RootProviders>
      </body>
    </html>
  );
}
