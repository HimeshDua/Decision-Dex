import type { Metadata } from "next";
import "./globals.css";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Decision Dex",
  description: "Make smarter choices, track your path.",
  openGraph: {
    title: 'Decision Dex',
    description: 'Manage your personal information, settings, and more.',
    url: 'https://decisiondex.vercel.app/profile',
    siteName: 'Decision Dex',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  }
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
