'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { SearchProvider } from '../context/SearchContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: DashboardLayoutProps) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <SearchProvider>
        <LayoutContent>{children}</LayoutContent>
      </SearchProvider>
    </SidebarProvider>
  );
}