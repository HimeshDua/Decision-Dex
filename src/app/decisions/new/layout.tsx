import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create New Decision - Decision Dex',
    description: 'Start a new decision process and evaluate your options smartly.',
    openGraph: {
        title: 'Create New Decision - Decision Dex',
        description: 'Create a new decision and start evaluating your choices easily.',
        url: 'https://decisiondex.vercel.app/decisions/new',
        siteName: 'Decision Dex',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function NewDecisionLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="new-decision-layout">
            {children}
        </section>
    );
}
