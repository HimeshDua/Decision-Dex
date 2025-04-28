import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Profile - Decision Dex',
  description: 'View and edit your personal profile details on Decision Dex.',
  openGraph: {
    title: 'Profile - Decision Dex',
    description: 'Manage your personal information, settings, and more.',
    url: 'https://decisiondex.vercel.app/profile',
    siteName: 'Decision Dex',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="profile-layout-wrapper">
      {children}
    </div>
  );
}
