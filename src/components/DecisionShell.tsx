"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import DecisionDetail from './DecisionClient'
import EditDecision from './EditDecision';
import Link from 'next/link';
import { ArrowLeft, Edit } from 'lucide-react';
import { Badge } from './ui/badge';
import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';
import UnAuthenticatedPage from './UnAuthenticatedPage';

interface Option {
    id: string;
    title: string;
    pros: { id: string; content: string }[];
    cons: { id: string; content: string }[];
}

interface Decision {
    id: string;
    title: string;
    labelAuto: boolean;
    userDecision: string | null;
    status: 'Pending' | 'InProgress' | 'Completed';
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    options: Option[];
}


function DecisionShell({ decision }: { decision: Decision }) {
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const { status: sessionStatus } = useSession()


    if (sessionStatus === 'unauthenticated') {
        return <UnAuthenticatedPage />;
    }

    if (sessionStatus === 'loading') {
        return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <Skeleton className="h-10 w-32" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header with back button and title */}
            <div className="flex items-center justify-between">
                <Link href="/decisions">
                    <Button variant="ghost" className="flex items-center gap-2">
                        <ArrowLeft size={18} /> Back to Decisions
                    </Button>
                </Link>
                <div className="flex items-center gap-4">
                    <Badge variant={
                        decision.status === 'Completed' ? 'success' :
                            decision.status === 'InProgress' ? 'default' : 'secondary'
                    }>
                        {decision.status}
                    </Badge>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Done" : <span className='flex items-center gap-2'> < Edit size={16} /> Edit </span>
                    }</Button>

                </div>
            </div>
            {isEditing ?
                <EditDecision decision={decision} /> :
                <DecisionDetail decision={decision} />}
        </section>
    )
}

export default DecisionShell