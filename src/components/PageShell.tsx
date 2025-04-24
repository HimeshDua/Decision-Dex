"use client"
import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";

export default function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <SessionProvider >
                <Navbar />
                {children}
            </SessionProvider>
        </div>
    )
}

