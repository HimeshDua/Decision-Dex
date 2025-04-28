import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
export default function UnAuthenticatedPage() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[94vh] bg-background text-foreground">
            <div className="px-6 py-12 md:px-12 md:py-20 rounded-lg shadow-xl bg-card text-card-foreground w-full max-w-md">
                <h2 className="text-3xl font-semibold tracking-tight mb-6 text-center">
                    Welcome!
                </h2>
                <p className="text-lg text-muted-foreground mb-8 text-center">
                    Please sign in to access all features.
                </p>
                <div className="flex flex-col gap-4 w-full">
                    <Link href="/signin">
                        <Button className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="outline" className="w-full">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}