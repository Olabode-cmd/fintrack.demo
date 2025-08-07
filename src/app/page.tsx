"use client";

import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import TransactionsTable from '../components/TransactionsTable';
import Button from '../components/Button';
import { statsData, transactionsData } from '../data/dashboardData';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>('overview');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">Wallet Ledge</h2>
                <ChevronDown size={20} className="text-gray-600 cursor-pointer" />
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                Active
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button>Share</Button>
              <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 cursor-pointer">
                <MoreHorizontal size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/people.png" alt="People" width={105} height={32} className="rounded-full" />
            <span className="text-sm text-gray-600">Ava, Liam, Noah, +12 others</span>
          </div>
          
          <div className="px-4 border-b border-gray-200">
            <div className="flex space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`py-3 text-sm font-medium cursor-pointer ${
                  activeTab === 'overview' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('transactions')}
                className={`py-3 text-sm font-medium cursor-pointer ${
                  activeTab === 'transactions' ? 'tab-active' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Transactions
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === 'overview' && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.map((stat, index) => (
                  <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    isPositive={stat.isPositive}
                  />
                ))}
              </div>
            </div>

            <div>
              <TransactionsTable data={transactionsData} />
            </div>
          </>
        )}

        {activeTab === 'transactions' && (
          <div className="p-8 text-center text-gray-500">
            Transaction content not provided
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
