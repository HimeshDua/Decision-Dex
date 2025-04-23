import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import PageShell from "@/components/PageShell";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Decision Dex",
  description: "Make smarter choices, track your path.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
