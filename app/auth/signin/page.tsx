"use client";

import { Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.46h5.64c-.11.86-.73 2.15-2.09 3.02l-.02.12 3.02 2.29.21.02c1.93-1.74 3.04-4.3 3.04-7.11Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.76 0 5.08-.89 6.78-2.42l-3.23-2.43c-.86.59-2.01 1-3.55 1-2.7 0-4.98-1.74-5.79-4.15l-.12.01-3.14 2.38-.04.11A10.25 10.25 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.21 14c-.21-.59-.33-1.22-.33-1.88s.12-1.29.32-1.88l-.01-.13-3.18-2.42-.1.04a9.86 9.86 0 0 0 0 8.77L6.21 14Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.08c1.94 0 3.25.82 4 1.5l2.92-2.78C17.07 3.14 14.76 2 12 2a10.25 10.25 0 0 0-9.09 5.5l3.29 2.5C7.02 7.82 9.3 6.08 12 6.08Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-xl items-center px-4 py-8">
      <div className="w-full rounded-xl border bg-card p-6 shadow-sm">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use Google to continue to your feed.
          </p>
        </header>

        <button
          onClick={() => signIn("google", { callbackUrl })}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 font-medium text-black transition hover:bg-white/90"
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="bg-card text-card-foreground p-4 shadow-md">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            UPLIFE
          </Link>
        </div>
      </nav>

      <Suspense
        fallback={
          <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-xl items-center px-4 py-8">
            <div className="w-full rounded-xl border bg-card p-6 shadow-sm" />
          </section>
        }
      >
        <SignInContent />
      </Suspense>
    </main>
  );
}
