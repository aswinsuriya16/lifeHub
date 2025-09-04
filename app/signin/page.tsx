"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const session = useSession();


  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-card text-card-foreground rounded-xl shadow-md border border-border">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        {!session.data?.user && <button onClick={()=>{
            signIn()
        }}>Login</button>}
        {session.data?.user && <button onClick={()=>{
            signOut()
        }}>Logout</button>}
      </div>
    </div>
  );
}
