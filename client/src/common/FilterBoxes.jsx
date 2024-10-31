import React, { useState } from 'react';

const FilterBox = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border rounded-md p-2 mb-2">
      <button className="w-full text-left" onClick={toggleFilter}>
        {title}
        <span className="float-right">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterBox;