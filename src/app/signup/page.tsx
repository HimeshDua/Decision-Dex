import { SignUpForm } from "@/components/SignupForm"
import { div } from "motion/react-client"

function page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[94vh] bg-gradient-to-b from-accent to-accent-foreground/10 p-32">
            <SignUpForm />
        </div>
    )
}

export default page