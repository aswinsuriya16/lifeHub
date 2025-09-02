import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

export default function DarkSigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "At least 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate an auth request
    setTimeout(() => {
      setLoading(false);
      alert(`Signed in as ${email} (remember: ${remember ? "yes" : "no"})`);
    }, 900);
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-zinc-100 antialiased">
      {/* Background aesthetics */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-zinc-900/40 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl md:grid-cols-[1.15fr_1fr]"
        >
          {/* Left panel */}
          <div className="relative hidden min-h-[520px] items-center justify-center md:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
            <DecorativeGrid />
            <div className="relative z-10 p-10">
              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-4xl font-semibold tracking-tight"
              >
                Welcome back
              </motion.h1>
              <p className="mt-3 max-w-sm text-zinc-400">
                Sign in to continue where you left off. Your dashboard, projects and insights
                are just one step away.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-zinc-400">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                Secure • Encrypted • 2FA ready
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="relative p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow" />
              <div>
                <h2 className="text-lg font-medium leading-5">Sign in</h2>
                <p className="text-xs text-zinc-400">Dark-only • Minimal • Modern</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-10 bg-zinc-900/60 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-indigo-500"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-200">Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} />
                  <Input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-zinc-900/60 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-indigo-500"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-zinc-400 hover:text-zinc-200 focus:outline-none"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400">{errors.password}</p>
                )}
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <Checkbox
                    checked={remember}
                    onCheckedChange={(v) => setRemember(Boolean(v))}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="group w-full justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-5 text-base font-medium shadow-lg hover:from-indigo-500 hover:to-fuchsia-500 focus-visible:ring-indigo-500"
              >
                {loading ? (
                  <span className="animate-pulse">Signing in…</span>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={18} />
                  </>
                )}
              </Button>

              {/* Social */}
              <div className="space-y-4">
                <div className="relative">
                  <Separator className="bg-zinc-700" />
                  <span className="absolute left-1/2 top-1 -translate-x-1/2 bg-zinc-900/60 px-3 text-xs text-zinc-400">
                    or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-xl border-zinc-700 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-900"
                  >
                    <Github size={18} className="mr-2" /> GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-xl border-zinc-700 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-900"
                  >
                    <Chrome size={18} className="mr-2" /> Google
                  </Button>
                </div>
              </div>

              {/* Meta */}
              <p className="pt-2 text-center text-sm text-zinc-400">
                Don’t have an account? <a className="text-indigo-400 hover:text-indigo-300" href="#">Create one</a>
              </p>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function DecorativeGrid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="60%" cy="40%" r="220" fill="url(#glow)" />
    </svg>
  );
}
