'use client';

import { Menu, Search } from 'lucide-react';
import ThemeToggle from '../layout/ThemeToggle';
import UserDisplay from './UserDisplay';
import { useDashboardSidebar } from '../../providers/sidebar';

export default function TopBar() {
  const { mobileOpen, openSidebar } = useDashboardSidebar();

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-border/60 bg-background">
      <div className="flex items-center gap-3 flex-1">
        <button
          className="lg:hidden p-2 -ml-2 text-muted hover:text-foreground transition-colors"
          onClick={openSidebar}
          aria-expanded={mobileOpen}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-sm w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search sensors, locations..."
            className="w-full bg-card border border-border text-sm text-foreground placeholder:text-muted rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <ThemeToggle />

        <UserDisplay />
      </div>
    </header>
  );
}
