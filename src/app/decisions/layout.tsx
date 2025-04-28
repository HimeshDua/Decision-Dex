import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Decisions - Decision Dex',
    description: 'View, manage, and create decisions efficiently with Decision Dex.',
    openGraph: {
        title: 'Decisions - Decision Dex',
        description: 'Organize and manage all your decisions in one place with Decision Dex.',
        url: 'https://decisiondex.vercel.app/decisions',
        siteName: 'Decision Dex',
        locale: 'en_US',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function DecisionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="decisions-layout">
            {children}
        </section>
    );
}
