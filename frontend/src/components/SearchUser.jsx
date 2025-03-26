import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function SearchUser() {
  const [SearchData, setSearchData] = useState("");
  const { unAuthUser, Searchuser, AddFriend } = useChatStore();

  const HandleSearch = async (SearchData) => {
    await Searchuser({ email: SearchData });
  }

  // Trigger search on Enter key
  const Handlekey = (e) => {
    if (e.key === "Enter") {
      HandleSearch(SearchData);
    }
  };

  return (
    <div className="w-full px-4 mt-4">
      <div className="relative w-full">
        <input
          className="w-full h-11 rounded-3xl pl-4 pr-9 text-sm sm:text-base shadow-lg text-black  font-mono  outline-none  border-black/10 border-t-2 "
          placeholder="friend@gmail.com"
          value={SearchData}
          type="search"
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={Handlekey}
        />
        
        <button
          className="absolute  top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-150"
          onClick={() => {
            HandleSearch(SearchData);
          }}
        >
          <Search className="text-white w-5 h-5" />
        </button>
      </div>

      
      {unAuthUser && (
        <div className="w-full bg-gray-800 text-white rounded-lg shadow-md mt-3 p-3 flex items-center gap-3">
          
          <img
            src={unAuthUser?.profilepic || "avatar.png"}
            className="w-10 h-10 rounded-full object-cover border border-gray-600"
          />
          
          <p className="text-sm sm:text-base font-mono font-semibold flex-grow">
            {unAuthUser?.username}
          </p>
          
          <UserPlus
            className="text-xl text-teal-500 cursor-pointer hover:scale-110 transition-transform"
            onClick={AddFriend}
          />
        </div>
      )}
    </div>
  );
}

export default SearchUser;
