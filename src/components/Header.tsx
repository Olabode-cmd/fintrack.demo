'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSidebar } from '../context/SidebarContext';
import { useSearch } from '../context/SearchContext';
import { User, LogOut } from 'lucide-react';

export default function Header() {
  const { toggle } = useSidebar();
  const { searchQuery, setSearchQuery } = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white relative">
      <div className="flex items-center gap-4">
        <button onClick={toggle}>
          <Image src="/menu.png" alt="Menu" width={24} height={24} />
        </button>
        <Image src="/logo.png" alt="Logo" width={120} height={32} className="h-8 w-auto" />
      </div>
      
      <div className="flex items-center gap-6 relative">
        <button onClick={() => setShowSearch(!showSearch)} className="cursor-pointer">
          <Image src="/search.png" alt="Search" width={20} height={20} />
        </button>
        
        {showSearch && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowSearch(false)} />
            <div className="absolute top-full right-20 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-gray-800 text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                autoFocus
              />
            </div>
          </>
        )}
        
        <button className="cursor-pointer">
          <Image src="/app-grid.png" alt="Apps" width={20} height={20} />
        </button>
        
        <div className="relative">
          <button onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
            <Image 
              src="/profile.png" 
              alt="Profile" 
              width={32} 
              height={32} 
              className="rounded-full w-8 h-8"
            />
          </button>
          
          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}