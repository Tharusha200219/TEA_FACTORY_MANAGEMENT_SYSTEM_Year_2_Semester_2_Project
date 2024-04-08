import React from 'react';

const SupplierSearch = ({ searchInput, setSearchInput, searchType, setSearchType, showSearchType}) => {
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder={`Search ${searchType ? (searchType === 'id' ? 'Supplier ID' : 'Supplier Name'): 'Supplier'}`}
        value={searchInput}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 mr-2 rounded-md w-1/4"
      />

     {showSearchType && 
      <select
        value={searchType}
        onChange={handleTypeChange}
        className="border border-gray-400 px-4 py-2 mr-2 rounded-md"
      >
        <option value="id">Supplier ID</option>
        <option value="name">Supplier Name</option>
      </select>
     }
      {/* <button
        onClick={handleButtonClick}
        className="px-4 py-2 rounded-md bg-blue-500 text-white"
      >
        Search
      </button> */}
    </div>
  );
};

export default SupplierSearch;
