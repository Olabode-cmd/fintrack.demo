'use client';

import { useState } from 'react';
import { Transaction } from '../types';
import { Plus, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import EmptyState from './EmptyState';
import StatCard from './StatCard';
import { AddTransactionModal } from './Modal';

interface TransactionsListProps {
  data: Transaction[];
}

export default function TransactionsList({ data }: TransactionsListProps) {
  const [filter, setFilter] = useState<'all' | 'Credit' | 'Debit'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  );

  const totalCredits = transactions.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0);
  const totalDebits = transactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">All Transactions</h2>
          <p className="text-sm text-gray-500">Manage and track your financial activities</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#4B8B9F] text-black rounded-full hover:bg-[#4B8B9F]/90 flex items-center space-x-2 cursor-pointer w-fit"
        >
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Credits"
          value={`$${totalCredits.toLocaleString()}`}
          change="+3%"
          isPositive={true}
        />
        <StatCard
          title="Total Debits"
          value={`$${totalDebits.toLocaleString()}`}
          change="-2%"
          isPositive={false}
        />
        <StatCard
          title="Net Balance"
          value={`$${(totalCredits - totalDebits).toLocaleString()}`}
          change="+5%"
          isPositive={totalCredits > totalDebits}
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as 'all' | 'Credit' | 'Debit')}
              className="text-sm border border-gray-300 rounded px-2 py-1 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Credit">Credits Only</option>
              <option value="Debit">Debits Only</option>
            </select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <EmptyState 
            title="No transactions found" 
            description="No transactions match your current filter"
          />
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTransactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'Credit' ? 
                        <ArrowUpRight className="text-green-600" size={16} /> :
                        <ArrowDownLeft className="text-red-600" size={16} />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.remark}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'Credit' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.currency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}