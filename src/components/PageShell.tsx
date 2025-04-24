"use client"
import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import { GlobalProvider } from "@/context/GlobalProvider";

export default function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <GlobalProvider>
                <SessionProvider >
                    <Navbar />
                    {children}
                </SessionProvider>
            </GlobalProvider>
        </div>
    )
}

