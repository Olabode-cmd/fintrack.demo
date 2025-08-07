import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import TransactionsTable from '../components/TransactionsTable';
import { statsData, transactionsData } from '../data/dashboardData';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Summary</h2>
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
      </div>
    </DashboardLayout>
  );
}
