import React from 'react';

const OrderSearchBar = ({ searchInput, setSearchInput, handleSearch, handleButtonClick }) => {
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search Order ID"
        value={searchInput}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 mr-2 rounded-md w-1/4"
      />
      <button
        onClick={() => handleButtonClick()}
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default OrderSearchBar;