interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({ 
  title = "No data available", 
  description = "There's nothing to show here yet." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}