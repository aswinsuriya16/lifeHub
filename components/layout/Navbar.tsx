"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, User, Settings, LogOut } from "lucide-react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-bold text-xl px-3 py-1.5 rounded-lg">
                            LH
                        </div>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        LifeHub
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/profile"
                        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </div>

                {/* User Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
                    <div className="container px-4 py-4 space-y-3">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className="h-5 w-5" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <User className="h-5 w-5" />
                            <span>Profile</span>
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                        <button
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors w-full"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
