'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type SidebarContextType = {
  mobileOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function DashboardSidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openSidebar = () => {
    setMobileOpen(true);
  };

  const closeSidebar = () => {
    setMobileOpen(false);
  };

  const toggleSidebar = () => {
    setMobileOpen((open) => !open);
  };

  return (
    <SidebarContext.Provider
      value={{ mobileOpen, openSidebar, closeSidebar, toggleSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useDashboardSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error(
      'useDashboardSidebar must be used within a DashboardSidebarProvider'
    );
  }
  return context;
}
