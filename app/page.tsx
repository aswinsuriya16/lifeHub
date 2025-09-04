import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import FeedClient from "./components/feed-client"
import SignOutButton from "./components/SignOutButton"
import Link from "next/link"

export const metadata = {
  title: "Twix | Simple Tweet Feed",
  description: "Post short updates, upvote/downvote, and see the most loved first.",
}

export default async function HomePage() {
  const session = await getServerSession()

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border bg-card text-card-foreground">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-lg font-semibold">
            Twix
          </Link>

          <div>
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{session.user?.name}</span>
                <SignOutButton />
              </div>
            ) : (
              <Link
                href="/signin"
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Feed */}
      <section className="mx-auto max-w-xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">Twix</h1>
          <p className="text-sm text-muted-foreground">Share a thought. Upvote what you like.</p>
        </header>

        <Suspense>
          <FeedClient />
        </Suspense>
      </section>
    </main>
  )
}
