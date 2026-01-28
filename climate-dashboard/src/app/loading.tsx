export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow space-y-4"
          >
            <div className="h-10 w-10 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-6 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
