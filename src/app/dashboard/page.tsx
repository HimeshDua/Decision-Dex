"use server";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, PlusCircle, LineChart } from "lucide-react";
import { Metadata } from "next";

export default async function DashboardPage() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
            {/* Heading */}
            <header className="mb-10 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">
                    Welcome back, OG🔥
                </h1>
                <p className="text-sm text-muted-foreground">
                    Keep the streak alive. Make one smart decision today.
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

            {/* Recent Decisions */}
            <section aria-labelledby="recent-decisions" className="mb-12">
                <h2 id="recent-decisions" className="text-xl font-semibold mb-4">
                    Recent Decisions
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { title: "Move to new city?", desc: "3 options evaluated" },
                        { title: "Buy a new laptop?", desc: "Decision completed" },
                        { title: "Freelance or full-time?", desc: "Still deciding" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-4 border bg-background shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Stats */}
            <section aria-labelledby="stats" className="mb-12">
                <h2 id="stats" className="sr-only">Dashboard Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { label: "Total Decisions", value: 18 },
                        { label: "Currently Deciding", value: 2 },
                        { label: "Avg Time to Decide", value: "4h 32m" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-4 border bg-background shadow-sm hover:shadow-md transition-shadow"
                        >
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tip of the Day */}
            <section aria-labelledby="tip" className="mb-12">
                <div className="border rounded-xl p-4 bg-muted/20">
                    <h2 id="tip" className="font-semibold text-lg mb-2">🧠 Decision Tip of the Day</h2>
                    <p className="text-sm text-muted-foreground">
                        Don’t just weigh pros and cons—rank them by how aligned they are with your long-term goals.
                    </p>
                </div>
            </section>

            {/* Motivational Quote */}
            <footer className="text-center text-sm text-muted-foreground mt-8">
                <Sparkles className="mx-auto mb-2 animate-pulse" />
                <p>“You are one decision away from a totally different life.”</p>
            </footer>
        </section>
    );
}
