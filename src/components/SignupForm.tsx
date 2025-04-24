'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                const signInResult = await signIn('credentials', {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: '/',
                });

                if (signInResult?.error) {
                    setError('Failed to sign in after registration.');
                } else {
                    router.push('/');
                }
            } else {
                setError(data?.message || 'Registration failed.');
            }
        } catch (error: any) {
            setError(`An unexpected error occurred during registration. ${error}`);
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader className="pb-2">
                <CardTitle>Create an account</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Enter your email and password to sign up.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        autoComplete="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className="w-full" onClick={handleSubmit}>
                    Sign Up
                </Button>
                {/* <div className="relative w-full py-1">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase text-muted-foreground bg-background px-2">
                        Or continue with
                    </div>
                </div> 
                 <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                >
                    Sign up with Google
                </Button> */}
                <p className="text-xs text-muted-foreground mt-2">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}