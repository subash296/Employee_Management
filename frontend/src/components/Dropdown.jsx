import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false);  
  const dropdownRef = useRef(null);

  
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelectOption = (value) => {
    setSortBy(value);
  };


  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false); 
    }
  };

 
  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
      >
        Sortby
      
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7l7 7 7-7"></path>
        </svg>
      </button>

 
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1 hover:cursor-pointer">
           
              
            <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={(e)=>{handleSelectOption("f_Id")}}>Id</p>
            <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={(e)=>{handleSelectOption("f_Email")}}>Email</p>
            <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={(e)=>{handleSelectOption("f_Name")}}>Name</p>
            <p className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={(e)=>{handleSelectOption("f_CreteDate")}}>Date</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
