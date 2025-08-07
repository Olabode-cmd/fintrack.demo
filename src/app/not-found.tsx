import DashboardLayout from '../components/DashboardLayout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn&apos;t exist yet.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#4B8B9F] text-black rounded-full hover:bg-[#4B8B9F]/90 transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}