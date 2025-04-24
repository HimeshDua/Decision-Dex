'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
    id: string;
    name: string;
    email: string;
    avatar?: string;
};

type GlobalContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error('useGlobalContext must be used inside GlobalProvider');
    return context;
};
