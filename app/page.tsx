import { Suspense } from "react"
import FeedClient from "./components/feed-client"

export const metadata = {
  title: "Twix | Simple Tweet Feed",
  description: "Post short updates, upvote/downvote, and see the most loved first.",
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">Twix</h1>
        <p className="text-sm text-muted-foreground">Share a thought. Upvote what you like.</p>
      </header>
      <Suspense>
        <FeedClient />
      </Suspense>
    </main>
  )
}
