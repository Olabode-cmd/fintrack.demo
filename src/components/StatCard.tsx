import { MoreHorizontal } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-[#34616F]/10 rounded-lg p-4 lg:p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-gray-900 font-medium">{title}</h3>
        <button className="text-gray-900 hover:cursor-pointer">
          <MoreHorizontal size={16} />
        </button>
      </div>
      <div className="mb-2">
        <span className="text-2xl lg:text-3xl font-semibold text-black">{value}</span>
      </div>
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}