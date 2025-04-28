import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Dashboard - Decision Dex',
    description: 'Overview of your decisions, insights, and performance on Decision Dex.',
    openGraph: {
        title: 'Dashboard - Decision Dex',
        description: 'Track your decision-making performance and insights at a glance.',
        url: 'https://decisiondex.vercel.app/dashboard',
        siteName: 'Decision Dex',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="dashboard-layout">
            {children}
        </section>
    );
}
