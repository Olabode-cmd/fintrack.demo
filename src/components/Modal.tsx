'use client';

import { ReactNode, useState } from 'react';
import { X } from 'lucide-react';
import { sanitizeInput, sanitizeNumber } from '../utils/security';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-lg w-full max-w-md">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: any) => void;
}

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    remark: '',
    amount: '',
    type: 'Credit' as 'Credit' | 'Debit',
    currency: 'USD'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedData = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      remark: sanitizeInput(formData.remark),
      amount: formData.type === 'Debit' ? -sanitizeNumber(formData.amount) : sanitizeNumber(formData.amount),
      currency: sanitizeInput(formData.currency),
      type: formData.type
    };

    onAdd(sanitizedData);
    setFormData({ remark: '', amount: '', type: 'Credit', currency: 'USD' });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: sanitizeInput(value)
    }));
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={formData.remark}
            onChange={(e) => handleInputChange('remark', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B8B9F]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B8B9F]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'Credit' | 'Debit' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B8B9F] cursor-pointer"
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-[#4B8B9F] text-black rounded-md hover:bg-[#4B8B9F]/90 cursor-pointer"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </BaseModal>
  );
}