'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, PlusCircle, CircleDot, FileText, Loader2, User as UserIcon, Calendar, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import UnAuthenticatedPage from '@/components/UnAuthenticatedPage';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [decisions, setDecisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus !== 'authenticated') return;
        const fetchData = async () => {
            try {
                // Fetch user data
                setUser(session.user)
                // Fetch user's decisions
                const decisionsRes = await fetch('/api/decision/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: session.user.id })
                });

                if (decisionsRes.ok) {
                    const decisionsData = await decisionsRes.json();
                    setDecisions(decisionsData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [sessionStatus]);


    if (sessionStatus === 'unauthenticated') {
        return <UnAuthenticatedPage />;
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin" />
                <p className="mt-2 text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Section */}
                <div className="w-full md:w-1/3">
                    <Card className="p-6">
                        <div className="flex flex-col items-center gap-4">
                            <Avatar className="w-24 h-24">
                                <AvatarImage />
                                <AvatarFallback
                                    className="absolute inset-0 bg-gradient-to-br from-foreground/90 from-45%  to-secondary">
                                    {session?.user.name ? (
                                        <span className="text-2xl font-semibold text-white">{session?.user.name?.charAt(0)}</span>
                                    ) : (
                                        <UserIcon size={40} className="text-white" />
                                    )}
                                </AvatarFallback>
                            </Avatar>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{user?.name}</h2>
                                <p className="text-muted-foreground">{user?.email}</p>
                            </div>

                            <Separator className="my-2" />

                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail size={18} className="text-muted-foreground" />
                                    <span className="text-sm">{user?.email}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-muted-foreground" />
                                    <span className="text-sm">
                                        Expires {session?.expires ? new Date(session.expires).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <Link href="/profile/edit" className="w-full mt-4">
                                <Button variant="outline" className="w-full flex gap-2">
                                    <Edit size={16} /> Edit Profile
                                </Button>
                            </Link>
                            <Button onClick={() => signOut()} variant="outline" className="w-full flex gap-2">
                                <Edit size={16} /> Sign Out
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Decisions Section */}
                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Your Decisions</h2>
                        <Link href="/decisions/new">
                            <Button className="flex gap-2">
                                <PlusCircle size={18} /> New Decision
                            </Button>
                        </Link>
                    </div>

                    {decisions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-xl">
                            <FileText size={48} className="text-muted-foreground mb-4" />
                            <p className="text-lg text-muted-foreground">No decisions yet</p>
                            <Link href="/decisions/new" className="mt-4">
                                <Button variant="outline" className="flex gap-2">
                                    <PlusCircle size={16} /> Create your first decision
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {decisions.map((decision: any) => (
                                <Card key={decision.id} className="hover:shadow-md transition-all">
                                    <Link href={`/decisions/${decision.id}`}>
                                        <CardContent className="p-6 space-y-2">
                                            <h3 className="font-semibold text-lg">{decision.title}</h3>
                                            <div className="flex items-center gap-2 text-sm">
                                                <CircleDot size={14} className="text-primary" />
                                                <span className="text-muted-foreground">{decision.userDecision}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-xs text-muted-foreground">
                                                    {decision._count?.options ?? 0} option{decision._count?.options !== 1 ? 's' : ''}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(decision.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}