import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row justify-center items-center min-h-[70vh] md:min-h-[85vh] lg:min-h-[94vh] py-16 md:py-24 px-6 md:px-12 lg:px-24">
            <article className="max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tighter text-shadow-black/30 text-shadow-md md:text-5xl lg:text-6xl leading-tight">
                    Streamline your decisions with clarity and confidence.
                </h1>

                <div className="mt-6 md:mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
                    <p className="leading-relaxed mb-4">
                        Not sure if you should eat that leftover pizza or go to the gym?
                        <br className="hidden md:inline" />
                        Yeah, we've all been there. Decision Dex helps you weigh your
                        options—minus the existential crisis.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8 pt-8 border-t-2 border-muted/20">
                    <Link href="/dashboard">
                        <Button variant="outline" className="text-base w-full sm:w-auto">
                            Enter the Decision Matrix (Dashboard)
                        </Button>
                    </Link>
                    <Link href="/decisions/new">
                        <Button className="text-base w-full sm:w-auto">
                            Get Started (No IQ Test Required)
                        </Button>
                    </Link>
                </div>
            </article>
        </section>
    );
}