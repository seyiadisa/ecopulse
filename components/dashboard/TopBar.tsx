import { Menu, Search } from 'lucide-react';
import ThemeToggle from '../layout/ThemeToggle';
import UserDisplay from './UserDisplay';

export default function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-white/6 dark:border-white/6 border-black/5 bg-background">
      <div className="flex items-center gap-3 flex-1">
        <button
          className="lg:hidden p-2 -ml-2 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
          onClick={onMenuToggle}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-sm w-full">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-500 light:text-gray-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search sensors, locations..."
            className="w-full bg-card dark:bg-card light:bg-white border border-white/8 dark:border-white/8 light:border-black/10 text-sm text-foreground placeholder-gray-600 dark:placeholder-gray-600 light:placeholder-gray-400 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-primary/40 transition-colors"
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

