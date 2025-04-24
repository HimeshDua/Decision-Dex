'use client';

import { Button } from '@/components/ui/button';
import { useGlobalContext } from '@/context/GlobalProvider';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Dashboard() {
    const { data: session, status } = useSession();
    const { setUser } = useGlobalContext()

    useEffect(() => {
        if (status === "authenticated") {
            setUser(session.user as any)
        }
    }, [status])

    if (status === 'loading') return <p>Loading...</p>;
    if (!session) return <p>You are not logged in</p>;

    return (
        <div>
            <h1>Welcome {session.user?.name}</h1>
            <p>Email: {session.user?.email}</p>
            <p>Expires at: {session.expires}</p>

            <Button variant="outline"
                onClick={() => { signOut({ callbackUrl: "/signin" }) }}>Sign Out</Button>
        </div>
    );
}
