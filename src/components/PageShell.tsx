import Navbar from "./Navbar";

export default function PageShell({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

