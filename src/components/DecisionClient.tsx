'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Edit, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

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

export default function DecisionDetail({ decision }: { decision: Decision }) {
    const { data: session, status: sessionStatus } = useSession();

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Please sign in to view this decision</h1>
                <Link href="/login">
                    <Button>Sign In</Button>
                </Link>
            </div>
        );
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

    if (!decision) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Decision not found</h1>
                <Link href="/decisions">
                    <Button>Back to Decisions</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
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
                    <Link href={`/decisions/${decision.id}/edit`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Edit size={16} /> Edit
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main decision card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{decision.title}</CardTitle>
                    <CardDescription>
                        {decision.labelAuto && <Badge variant="outline" className="mr-2">Auto-labeled</Badge>}
                        Created on {new Date(decision.createdAt).toLocaleDateString()}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Final decision section */}
                    {decision.userDecision && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Final Decision</h3>
                            <p className="text-lg font-medium p-4 bg-muted/50 rounded-lg">
                                {decision.userDecision}
                            </p>
                        </div>
                    )}

                    <Separator />

                    {/* Options section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Options</h3>
                        {decision.options.length === 0 ? (
                            <p className="text-muted-foreground">No options added yet</p>
                        ) : (
                            <div className="space-y-6">
                                {decision.options.map((option) => (
                                    <div key={option.id} className="space-y-4">
                                        <h4 className="font-medium text-lg">{option.title}</h4>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Pros column */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <Plus size={16} />
                                                    <h5 className="font-medium">Pros</h5>
                                                </div>
                                                {option.pros.length > 0 ? (
                                                    <ul className="space-y-2 pl-6">
                                                        {option.pros.map((pro) => (
                                                            <li key={pro.id} className="text-sm list-disc">
                                                                {pro.content}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No pros listed</p>
                                                )}
                                            </div>

                                            {/* Cons column */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-red-600">
                                                    <Minus size={16} />
                                                    <h5 className="font-medium">Cons</h5>
                                                </div>
                                                {option.cons.length > 0 ? (
                                                    <ul className="space-y-2 pl-6">
                                                        {option.cons.map((con) => (
                                                            <li key={con.id} className="text-sm list-disc">
                                                                {con.content}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">No cons listed</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="text-sm text-muted-foreground">
                    Last updated on {new Date(decision.updatedAt).toLocaleDateString()}
                </CardFooter>
            </Card>
        </div>
    );
}