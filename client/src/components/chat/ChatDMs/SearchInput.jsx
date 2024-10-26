import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2 pt-2">
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full p-1"
      />
      <button
        type="submit"
        className="p-1 btn btn-circle bg-[#1F2839] text-white rounded-full"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
