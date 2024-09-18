import React from 'react';

const SearchBar = ({ searchTerm, handleInputChange, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search book title..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
