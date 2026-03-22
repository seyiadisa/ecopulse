'use client';

import { LayoutDashboard, Map, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../layout/Logo';
import { useDashboardSidebar } from '../../providers/sidebar';

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

export default function Sidebar() {
  const { mobileOpen, closeSidebar } = useDashboardSidebar();

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-40">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-scrim backdrop-blur-sm"
            onClick={closeSidebar}
          />
          <aside className="relative flex flex-col w-60 z-10">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent() {
  const { closeSidebar } = useDashboardSidebar();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-border/60">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border/60">
        <Logo />
        <span className="text-base font-semibold text-foreground">
          EcoPulse
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="text-3xs font-semibold uppercase tracking-widest text-muted px-3 mb-3">
          Navigation
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <span className={active ? 'text-primary' : 'text-muted'}>
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
