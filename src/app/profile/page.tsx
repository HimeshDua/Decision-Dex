'use client';

import { useSession } from 'next-auth/react';

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === 'loading') return <p>Loading...</p>;
    if (!session) return <p>You are not logged in</p>;

    return (
        <div>
            <h1>Welcome {session.user?.name}</h1>
            <p>Email: {session.user?.email}</p>
        </div>
    );
}
