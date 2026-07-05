function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
        alt="No Properties"
        className="w-32 h-32 mb-6 opacity-80"
      />

      <h2 className="text-3xl font-bold text-gray-700">
        No Properties Found
      </h2>

      <p className="text-gray-500 mt-3">
        Try changing your search or check back later.
      </p>

    </div>
  );
}

export default EmptyState;