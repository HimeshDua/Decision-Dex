import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="w-full bg-foreground border-b border-border text-foreground sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className='flex items-center space-x-2 cursor-pointer'>
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
                        className="mr-2 h-5 w-5 text-background"
                    >
                        <path d="M20.29 11.71A6 6 0 0 0 12 6a6 6 0 0 0-8.29 11.71"></path>
                        <path d="M18 18v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1"></path>
                        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    </svg>
                    <h1 className="text-xl font-semibold text-background tracking-tight ">
                        Decision Dex
                    </h1>
                </Link>

                {/* Mobile Menu Button */}
                <button onClick={toggleMobileMenu} className="sm:hidden text-background focus:outline-none">
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex space-x-6 text-sm font-medium">
                    {status === 'authenticated' ? (
                        <>
                            <Link href="/dashboard" className="hover:underline underline-offset-1 text-background transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/decisions" className="hover:underline underline-offset-1 text-background transition-colors">
                                Decisions
                            </Link>
                            <Link href="/profile" className="hover:underline underline-offset-1 text-background transition-colors">
                                Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/signin" className="hover:underline underline-offset-1 text-background transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup" className="hover:underline underline-offset-1 text-background transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden absolute top-full left-0 rounded-t-none w-full bg-foreground shadow-md rounded-md py-2 flex flex-col items-center">
                        {status === 'authenticated' ? (
                            <>
                                <Link href="/dashboard" className="block py-2 px-4 text-sm font-medium text-background hover:bg-background/10 w-full text-center">
                                    Dashboard
                                </Link>
                                <Link href="/decisions" className="block py-2 px-4 text-sm font-medium text-background hover:bg-background/10 w-full text-center">
                                    Decisions
                                </Link>
                                <Link href="/profile" className="block py-2 px-4 text-sm font-medium text-background hover:bg-background/10 w-full text-center">
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/signin" className="block py-2 px-4 text-sm font-medium text-background hover:bg-background/10 w-full text-center">
                                    Sign In
                                </Link>
                                <Link href="/signup" className="block py-2 px-4 text-sm font-medium text-background hover:bg-background/10 w-full text-center">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}