import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MedSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search-results?query=${query}`);
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a medicine."
          className="w-full sm:flex-1 h-11 text-black rounded-full px-4 border border-gray-300 shadow focus:outline-none "
        />
        <button
          onClick={handleSearch}
          className="w-11 h-11 flex items-center justify-center bg-black rounded-full shadow hover:scale-110 transition-transform duration-150"
        >
          <Search className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MedSearch;
