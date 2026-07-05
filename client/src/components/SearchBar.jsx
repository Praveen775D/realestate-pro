function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="w-full">

      <input
        type="text"
        placeholder="Search by title, city or location..."
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;