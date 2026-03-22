import { DashboardSidebarProvider } from '@/providers/sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardSidebarProvider>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        <Sidebar />

        {/* Main content - offset by sidebar width on desktop */}
        <div className="flex flex-col flex-1 min-w-0 lg:ml-60">
          <TopBar />
          <main className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </main>
        </div>
      </div>
    </DashboardSidebarProvider>
  );
}
