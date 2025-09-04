"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/signin" })}
      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/80 transition"
    >
      Sign Out
    </button>
  );
}
