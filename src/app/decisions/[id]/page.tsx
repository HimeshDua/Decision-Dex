// In your page.tsx (Server Component)
import DecisionDetail from '@/components/DecisionClient';
import { prisma } from '@/lib/prisma';

export default async function DecisionPage({ params }: { params: { id: string } }) {
    const decision = await prisma.decision.findUnique({
        where: { id: params.id },
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

    return <DecisionDetail decision={decision} />;
}