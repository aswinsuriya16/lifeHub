"use client";

import { Suspense } from "react";
import FeedClient from "./components/feed-client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession(); 

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="bg-card text-card-foreground p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">LifeHub</h1>
        <div>
          {!session?.user && (
            <button
              onClick={() => signIn()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Login
            </button>
          )}
          {session?.user && (
            <button
              onClick={() => signOut()}
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <section className="mx-auto max-w-xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-balance text-2xl font-semibold tracking-tight">Twix</h1>
          <p className="text-sm text-muted-foreground">
            Share a thought. Upvote what you like.
          </p>
        </header>

        <Suspense>
          <FeedClient />
        </Suspense>
      </section>
    </main>
  );
}
