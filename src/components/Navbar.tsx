import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {

    const { status } = useSession();
    return (
        <nav className="w-full bg-foreground border-b border-border text-foreground">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className='flex items-center space-x-2'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 text-background"
                    >
                        <path d="M20.29 11.71A6 6 0 0 0 12 6a6 6 0 0 0-8.29 11.71"></path>
                        <path d="M18 18v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1"></path>
                        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    </svg>
                    <h1 className="text-xl font-semibold text-background tracking-tight ">
                        Decision Dex
                    </h1>
                </Link>

                {status === 'authenticated' ? (

                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <Link
                                href="/dashboard"
                                className="hover:underline underline-offset-1 text-background transition-colors"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/decisions"
                                className="hover:underline underline-offset-1 text-background transition-colors"
                            >
                                Decisions
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className="hover:underline underline-offset-1 text-background transition-colors"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex space-x-6 text-sm font-medium">
                        <li>
                            <Link
                                href="/signin"
                                className="hover:underline underline-offset-1 text-background transition-colors"
                            >
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/signup"
                                className="hover:underline underline-offset-1 text-background transition-colors"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                )
                }
            </div>
        </nav >
    );
}
