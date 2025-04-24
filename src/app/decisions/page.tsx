"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function DecisionsPage() {
    const decisions = [
        {
            id: 1,
            title: "Move to new city?",
            status: "In Progress",
            options: 3,
        },
        {
            id: 2,
            title: "Buy a new laptop?",
            status: "Completed",
            options: 4,
        },
        {
            id: 3,
            title: "Freelance or full-time?",
            status: "In Progress",
            options: 2,
        },
    ];

    return (
        <section className="p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Your Decisions</h1>
                <Link href="/decisions/new">
                    <Button className="flex gap-2">
                        <PlusCircle size={18} /> New Decision
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                <div className="flex w-full md:w-1/2 gap-2">
                    <Input placeholder="Search decisions..." />
                    <Button variant="outline" size="icon">
                        <Search size={18} />
                    </Button>
                </div>
                <Button variant="ghost" className="flex gap-2 text-muted-foreground">
                    <Filter size={18} /> Filters
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {decisions.map((d) => (
                    <Card key={d.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{d.title}</h3>
                            <p className="text-sm text-muted-foreground mb-1">{d.options} options</p>
                            <span className={`text-xs font-medium px-2 py-1 rounded bg-muted ${d.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                                {d.status}
                            </span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
