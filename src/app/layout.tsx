import type { Metadata } from "next";
import "./globals.css";
import PageShell from "@/components/PageShell";

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
      <body className={`antialiased`}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
