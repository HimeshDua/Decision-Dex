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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: true,
            callbackUrl: '/',
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push('/'); // Redirect to your homepage or dashboard on success
        }
    };

    return (
        <Card className="w-[350px]">
            <CardHeader className="pb-2">
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    Enter your email and password to sign in.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button className="w-full" onClick={handleSubmit}>
                    Sign In
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
                    Sign in with Google
                </Button> */}
                <p className="text-xs text-muted-foreground mt-2">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}