'use client';

import Image from 'next/image';
import { useSidebar } from '../context/SidebarContext';

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button onClick={toggle}>
          <Image src="/menu.png" alt="Menu" width={24} height={24} />
        </button>
        <Image src="/logo.png" alt="Logo" width={120} height={32} className="h-8 w-auto" />
      </div>
      
      <div className="flex items-center gap-3">
        <button>
          <Image src="/search.png" alt="Search" width={20} height={20} />
        </button>
        <button>
          <Image src="/app-grid.png" alt="Apps" width={20} height={20} />
        </button>
        <Image 
          src="/profile.png" 
          alt="Profile" 
          width={32} 
          height={32} 
          className="rounded-full w-8 h-8"
        />
      </div>
    </header>
  );
}