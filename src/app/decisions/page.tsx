'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, Filter, Search, CircleDot, FileText, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';

type Decision = {
    title: String;
    userDecision: String;
}

export default function DecisionsPage() {
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { data: session, status: sessionStatus } = useSession();

    const filteredDecisions = useMemo(() => {
        return decisions.filter((decision: Decision) =>
            decision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (decision.userDecision && decision.userDecision.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [decisions, searchTerm]);

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="text-center py-10">
                <h1 className="text-3xl font-bold tracking-tight mb-4">You are not logged in</h1>
                <Link href="/login">
                    <Button className="flex gap-2">Login</Button>
                </Link>
            </div>
        );
    }

    useEffect(() => {
        if (sessionStatus !== 'authenticated') return;

        const fetchData = async () => {
            const userId = session?.user?.id;
            if (!userId) {
                console.error('User ID not found');
                setLoading(false);
                return;
            }

            const res = await fetch('/api/decision/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });

            if (res.ok) {
                const data = await res.json();
                console.log("decisions array", data)
                setDecisions(data);
            } else {
                console.error('Failed to fetch decisions');
            }

            setLoading(false);
        };

        fetchData();
    }, [sessionStatus]);

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Your Decisions</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {filteredDecisions.length} decision{filteredDecisions.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Link href="/decisions/new">
                    <Button className="flex gap-2 bg-primary hover:bg-primary/90">
                        <PlusCircle size={18} /> New Decision
                    </Button>
                </Link>
            </div>

            <div className="mb-8">
                <div className="relative w-full max-w-xl">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search decisions by title or outcome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground">Loading decisions...</p>
                </div>
            ) : filteredDecisions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl bg-muted/50">
                    <FileText size={48} className="text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">
                        {searchTerm ? 'No matching decisions found' : 'No decisions yet'}
                    </p>
                    <Link href="/decisions/new" className="mt-4">
                        <Button variant="outline" className="flex gap-2">
                            <PlusCircle size={16} /> Create your first decision
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDecisions.map((d: any) => (
                        <Card
                            key={d.id}
                            className="hover:shadow-md transition-all duration-200 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-primary/30"
                        >
                            <Link href={`/decisions/${d.id}`}>
                                <CardContent className="p-6 space-y-3">
                                    <h3 className="font-semibold text-lg line-clamp-2">{d.title}</h3>
                                    <div className="flex items-center gap-2 text-sm">
                                        <CircleDot size={14} className="text-primary" />
                                        <span className="text-muted-foreground">{d.userDecision}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xs text-muted-foreground">
                                            {d._count?.options ?? 0} option{d._count?.options !== 1 ? 's' : ''}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(d.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
}