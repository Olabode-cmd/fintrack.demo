interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export default function StatCard({ title, value, change, isPositive }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
          </svg>
        </button>
      </div>
      <div className="mb-2">
        <span className="text-2xl lg:text-3xl font-semibold text-gray-900">{value}</span>
      </div>
      <div className="flex items-center">
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}