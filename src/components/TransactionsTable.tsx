'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import { Filter } from 'lucide-react';

import { Transaction } from '../types';
import { useSearch } from '../context/SearchContext';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

interface TransactionsTableProps {
  data: Transaction[];
  isLoading?: boolean;
}

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('remark', {
    header: 'Remark',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => `$${Math.abs(info.getValue())}`,
  }),
  columnHelper.accessor('currency', {
    header: 'Currency',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        <span className={`w-2 h-2 rounded-full mr-2 ${
          info.getValue() === 'Credit' ? 'bg-green-500' : 'bg-red-500'
        }`}></span>
        {info.getValue()}
      </span>
    ),
  }),
];

export default function TransactionsTable({ data, isLoading = false }: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const { searchQuery } = useSearch();

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    let filtered = data.filter(transaction => 
      transaction && 
      typeof transaction.remark === 'string' && 
      typeof transaction.amount === 'number' &&
      typeof transaction.type === 'string'
    );
    
    if (searchQuery) {
      filtered = filtered.filter(transaction => 
        transaction.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.amount.toString().includes(searchQuery) ||
        transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === typeFilter);
    }
    
    return filtered;
  }, [data, searchQuery, typeFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-white rounded-lg border border-gray-100 w-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Transactions</h3>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-sm text-gray-700 border border-gray-300 rounded px-2 py-1 cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredData.length === 0 ? (
        <EmptyState 
          title="No transactions found" 
          description={searchQuery || typeFilter !== 'all' ? "Try adjusting your search or filters" : "No transactions available"}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
                        <span className="text-gray-400">
                          {{
                            asc: '↑',
                            desc: '↓',
                          }[header.column.getIsSorted() as string] ?? '↕'}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-2 sm:px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-700">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}