'use client';

import { useSidebar } from '../context/SidebarContext';

const routes = [
  { name: 'Dashboard', href: '/', active: true },
  { name: 'Transactions', href: '/transactions', active: false },
  { name: 'Reports', href: '/reports', active: false },
  { name: 'Settings', href: '/settings', active: false },
];

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  return (
    <>
      <div className={`fixed top-16 left-0 right-0 bottom-0 bg-black/50 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`} 
           onClick={toggle} />
      
      <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white z-30 transform transition-all duration-300 lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-0 ${isOpen ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:-translate-x-64'}`}>
        <div className="p-6">
          <nav className="space-y-2">
            {routes.map((route) => (
              <a
                key={route.name}
                href={route.href}
                className={`block px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                  route.active 
                    ? 'bg-[#4B8B9F]/30 text-[#4B8B9F]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {route.name}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}