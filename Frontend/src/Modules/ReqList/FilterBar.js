import React from "react";

function FilterBar({ searchQuery, filterType, setSearchQuery, setFilterType, applyFilters }) {
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    applyFilters(query, filterType);
  };

  const handleDropdownChange = (event) => {
    const type = event.target.value;
    setFilterType(type);
    applyFilters(searchQuery, type);
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search orphanages..."
        className="search-bar"
        value={searchQuery}
        onChange={handleSearch}
      />
      <select className="dropdown" value={filterType} onChange={handleDropdownChange}>
        <option value="">All</option>
        <option value="food">Food</option>
        <option value="grocery">Grocery</option>
        <option value="freshGrocery">Fresh Grocery</option>
      </select>
    </div>
  );
}

export default FilterBar;
