import Link from "next/link";
import { Button } from "./ui/button";

export default function HeroSection() {
    return (
        <section className="flex flex-row justify-center items-start h-[94vh]">
            <article className="max-w-3xl text-center px-4 mt-32">
                <h1 className="text-4xl font-bold text-shadow-black/30 text-shadow-md tracking-tighter md:text-5xl lg:text-7xl ">
                    Streamline your decisions with clarity and confidence.
                </h1>

                <div className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
                    <p className="mb-4">
                        Not sure if you should eat that leftover pizza or go to the gym? <br />
                        Yeah, we've all been there. Decision Dex helps you weigh your options—minus the existential crisis.
                    </p>
                </div>

                <div className="border-0 border-t-2 flex flex-row gap-6 items-center justify-center mt-8 pt-8">
                    <Link href="signin">
                        <Button variant="outline" className="text-base">
                            Enter the Decision Matrix
                        </Button>
                    </Link>

                    <Link href="signup">
                        <Button className="text-base">
                            Get Started (No IQ Test Required)
                        </Button>
                    </Link>
                </div>
            </article>
        </section>
    );
}
