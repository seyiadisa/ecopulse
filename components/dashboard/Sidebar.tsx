'use client';

import { LayoutDashboard, Map, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../layout/Logo';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: 'Map',
    href: '/dashboard/map',
    icon: <Map size={18} />,
  },
  {
    label: 'Trends',
    href: '/dashboard/trends',
    icon: <TrendingUp size={18} />,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-40">
        <SidebarContent onClose={onClose} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="relative flex flex-col w-60 z-10">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-white/5 dark:border-white/5 light:border-black/5">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5 dark:border-white/5 light:border-black/5">
        <Logo />
        <span className="text-base font-semibold text-foreground">
          EcoPulse
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="text-3xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-600 light:text-gray-500 px-3 mb-3">
          Navigation
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5'
              }`}
            >
              <span
                className={
                  active
                    ? 'text-primary'
                    : 'text-gray-500 dark:text-gray-500 light:text-gray-400'
                }
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

