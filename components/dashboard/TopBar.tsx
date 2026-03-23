'use client';

import { Menu } from 'lucide-react';
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
      </div>

      <div className="flex items-center gap-3 ml-4">
        <ThemeToggle />

        <UserDisplay />
      </div>
    </header>
  );
}
