function SearchBar({
  value,
  onChange
}) {

  return (

    <input
      type="text"
      placeholder="Search Property..."
      value={value}
      onChange={onChange}
      className="border rounded-xl px-5 py-3 w-80"
    />

  );

}

export default SearchBar;