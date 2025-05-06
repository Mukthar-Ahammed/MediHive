import React from "react";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchError() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-4">
      <div className="max-w-xl text-center flex flex-col items-center gap-6 p-6">
        <img
          src="/graphics2.png"
          alt="No Match Graphic"
          className="w-40 sm:w-52 md:w-64 lg:w-100 h-auto animate-pulse"
        />

        <p className="text-base sm:text-lg md:text-lg font-medium text-gray-800">
          <span className="text-red-600 font-semibold">Sorry</span>, the medication you're looking for couldn't be found.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full shadow-md hover:scale-105 transition-transform duration-200"
        >
          <MoveRight className="w-20 h-10" />
        </button>
      </div>
    </div>
  );
}

export default SearchError;
