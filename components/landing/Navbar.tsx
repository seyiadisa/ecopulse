'use client';

import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Logo from '../layout/Logo';
import ThemeToggle from '../layout/ThemeToggle';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold text-white">EcoPulse</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <SignInButton mode="redirect">
              <button className="hidden text-sm text-gray-300 hover:text-white transition-colors px-3 py-1.5">
                Log In
              </button>
            </SignInButton>
            <SignUpButton mode="redirect">
              <button className="text-sm font-medium bg-primary text-black px-4 py-2 rounded-full hover:bg-primary-dark transition-colors">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

