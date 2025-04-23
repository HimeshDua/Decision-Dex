import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full bg-foreground border-b border-border text-foreground">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/">
                    <h1 className="text-xl font-semibold text-background tracking-tight ">
                        Decision Dex
                    </h1>
                </Link>

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
                            href="/history"
                            className="hover:underline underline-offset-1 text-background transition-colors"
                        >
                            History
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
            </div>
        </nav>
    );
}
