"use server"
// In your page.tsx (Server Component)
import DecisionDetail from '@/components/DecisionClient';
import DecisionShell from '@/components/DecisionShell';
import { prisma } from '@/lib/prisma';

export default async function DecisionPage({ params }: { params: { id: Promise<any> } }) {
    const id = await params.id;
    const decision = await prisma.decision.findUnique({
        where: { id: id },
        include: {
            options: {
                include: {
                    pros: true,
                    cons: true,
                },
            },
        },
    });

    if (!decision) {
        return <div>Decision not found</div>;
    }
    return <DecisionShell decision={decision} />
    // return <DecisionDetail decision={decision} />;
}