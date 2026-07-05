function EmptyState() {
  return (
    <div className="bg-white rounded-xl shadow p-12 text-center">

      <h2 className="text-3xl mb-3">
        🏠
      </h2>

      <h3 className="text-xl font-bold">
        No Properties Found
      </h3>

      <p className="text-gray-500 mt-2">
        Click Add Property to create your first property.
      </p>

    </div>
  );
}

export default EmptyState;