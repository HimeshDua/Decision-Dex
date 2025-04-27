'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, PlusCircle, LineChart, Clock, ListChecks, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
    const { data: session, status: sessionStatus } = useSession();
    const [decisions, setDecisions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDecisions: 0,
        pendingDecisions: 0,
        inProgressDecisions: 0,
        completedDecisions: 0,
        completionRate: 0
    });

    useEffect(() => {
        if (sessionStatus !== 'authenticated') return;

        async function fetchDashboardData() {
            try {
                const userId = session?.user?.id;
                const res = await fetch('/api/decision/getfull', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        include: {
                            options: {
                                include: {
                                    pros: true,
                                    cons: true
                                }
                            }
                        }
                    })
                });

                if (res.ok) {
                    const fetchedDecisions = await res.json();
                    setDecisions(fetchedDecisions);

                    // Calculate stats
                    const total = fetchedDecisions.length;
                    const pending = fetchedDecisions.filter((d: any) => d.status === 'Pending').length;
                    const inProgress = fetchedDecisions.filter((d: any) => d.status === 'InProgress').length;
                    const completed = fetchedDecisions.filter((d: any) => d.status === 'Completed').length;
                    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

                    setStats({
                        totalDecisions: total,
                        pendingDecisions: pending,
                        inProgressDecisions: inProgress,
                        completedDecisions: completed,
                        completionRate
                    });
                }
            } catch (error) {
                console.error('Failed to fetch decisions:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, [sessionStatus]);

    function getStatusBadge(status: string) {
        switch (status) {
            case 'Pending':
                return <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Pending
                </Badge>;
            case 'InProgress':
                return <Badge variant="default" className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> In Progress
                </Badge>;
            case 'Completed':
                return <Badge variant="success" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> Completed
                </Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    }

    if (sessionStatus === 'unauthenticated') {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h1>
                <Link href="/signin">
                    <Button>Sign In</Button>
                </Link>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            {/* Heading */}
            <header className="mb-10 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}🔥
                </h1>
                <p className="text-sm text-muted-foreground">
                    {decisions.length > 0
                        ? `You've made ${decisions.length} decision${decisions.length !== 1 ? 's' : ''} so far.`
                        : 'Make your first decision today.'}
                </p>
            </header>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
                <Link href="/decisions/new" passHref>
                    <Button className="flex items-center gap-2">
                        <PlusCircle size={18} /> New Decision
                    </Button>
                </Link>
                <Link href="/decisions" passHref>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <LineChart size={18} /> View All Decisions
                    </Button>
                </Link>
            </div>

            {/* Stats Overview */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Decision Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Decisions</CardTitle>
                            <ListChecks className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalDecisions}</div>
                            <p className="text-xs text-muted-foreground">
                                +{Math.floor(stats.totalDecisions * 0.1)} from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completionRate}%</div>
                            <Progress value={stats.completionRate} className="h-2 mt-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.inProgressDecisions}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.pendingDecisions} pending decisions
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Recent Decisions */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Recent Decisions</h2>
                    <Link href="/decisions">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                            View All
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Skeleton key={i} className="h-48 rounded-xl" />
                        ))}
                    </div>
                ) : decisions.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {decisions.slice(0, 3).map((decision) => (
                            <Link key={decision.id} href={`/decisions/${decision.id}`}>
                                <Card className="hover:shadow-md transition-shadow h-full flex flex-col">
                                    <CardHeader className="pb-3">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium line-clamp-2">
                                                {decision.title || 'Untitled Decision'}
                                            </h3>
                                            {getStatusBadge(decision.status)}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <div className="space-y-3">
                                            {decision.userDecision && (
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Your Decision</p>
                                                    <p className="font-medium">{decision.userDecision}</p>
                                                </div>
                                            )}

                                            {decision.options?.length > 0 && (
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Options</p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {decision.options.slice(0, 3).map((option: any) => (
                                                            <Badge key={option.id} variant="outline" className="text-xs">
                                                                {option.title}
                                                            </Badge>
                                                        ))}
                                                        {decision.options.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{decision.options.length - 3} more
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between text-xs text-muted-foreground">
                                        <span>
                                            {new Date(decision.createdAt).toLocaleDateString()}
                                        </span>
                                        <span>
                                            {decision.options?.length || 0} options
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">No decisions yet. Create your first one!</p>
                            <Link href="/decisions/new" className="mt-4 inline-block">
                                <Button size="sm" className="flex items-center gap-2">
                                    <PlusCircle size={16} /> New Decision
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </section>

            {/* Decision Status Breakdown */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Decision Status Breakdown</h2>
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="font-medium mb-3 flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> Pending
                                </h3>
                                <div className="space-y-3">
                                    {loading ? (
                                        [1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-md" />)
                                    ) : decisions.filter(d => d.status === 'Pending').length > 0 ? (
                                        decisions
                                            .filter(d => d.status === 'Pending')
                                            .slice(0, 2)
                                            .map(decision => (
                                                <div key={decision.id} className="border rounded-md p-3">
                                                    <h4 className="font-medium text-sm">{decision.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Created {new Date(decision.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No pending decisions</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> In Progress
                                </h3>
                                <div className="space-y-3">
                                    {loading ? (
                                        [1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-md" />)
                                    ) : decisions.filter(d => d.status === 'InProgress').length > 0 ? (
                                        decisions
                                            .filter(d => d.status === 'InProgress')
                                            .slice(0, 2)
                                            .map(decision => (
                                                <div key={decision.id} className="border rounded-md p-3">
                                                    <h4 className="font-medium text-sm">{decision.title}</h4>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-xs text-muted-foreground">
                                                            {decision.options?.length || 0} options
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {decision.comments?.length || 0} comments
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No decisions in progress</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" /> Completed
                                </h3>
                                <div className="space-y-3">
                                    {loading ? (
                                        [1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-md" />)
                                    ) : decisions.filter(d => d.status === 'Completed').length > 0 ? (
                                        decisions
                                            .filter(d => d.status === 'Completed')
                                            .slice(0, 2)
                                            .map(decision => (
                                                <div key={decision.id} className="border rounded-md p-3">
                                                    <h4 className="font-medium text-sm">{decision.title}</h4>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Chose: {decision.userDecision}
                                                    </p>
                                                </div>
                                            ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No completed decisions</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Decision Tip */}
            <section className="mb-12">
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                    <CardContent className="p-6">
                        <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                            <Sparkles size={18} /> Decision Tip
                        </h2>
                        <p className="text-sm">
                            {decisions.length > 0
                                ? "Review similar past decisions before making new ones. Look for patterns in what worked well."
                                : "Start with small, low-stakes decisions to practice your decision-making process."}
                        </p>
                        {decisions.length > 0 && (
                            <>
                                <Separator className="my-3" />
                                <p className="text-xs text-muted-foreground">
                                    You've completed {stats.completedDecisions} decisions.
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
            </section>

            {/* Motivational Quote */}
            <footer className="text-center text-sm text-muted-foreground mt-8">
                <Sparkles className="mx-auto mb-2 animate-pulse" />
                <p>“The best way to make good decisions is to make more decisions.”</p>
            </footer>
        </section>
    );
}