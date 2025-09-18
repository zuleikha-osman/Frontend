import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Dashboard from "@/app/dashboard/page"

export default async function Home() {
  try {
    const { userId } = await auth()

    if (!userId) {
      redirect("/sign-in")
    }

    return <Dashboard />
  } catch (error) {
    // If auth fails (like during signout), redirect to sign-in
    redirect("/sign-in")
  }
}
