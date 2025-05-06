import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function SearchUser() {
  const [SearchData, setSearchData] = useState("");
  const { unAuthUser, Searchuser, AddFriend } = useChatStore();

  const HandleSearch = async (SearchData) => {
    if (SearchData.trim()) {
      await Searchuser({ email: SearchData });
    }
  };

  const Handlekey = (e) => {
    if (e.key === "Enter") {
      HandleSearch(SearchData);
    }
  };

  return (
    <div className="w-full px-4 mt-4">

      <div className="relative w-full">
        <input
          className="w-full h-11 sm:h-12 rounded-full pl-4 pr-12 text-sm sm:text-base shadow-sm font-mono text-black outline-none border border-gray-300  transition-all"
          placeholder="friend@gmail.com"
          value={SearchData}
          type="search"
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={Handlekey}
        />

        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black hover:bg-black/60 text-white p-2 rounded-full shadow transition duration-200"
          onClick={() => HandleSearch(SearchData)}
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {unAuthUser && (
        <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md mt-4 p-3 flex items-center gap-3 hover:bg-gray-50 transition">
          <img
            src={unAuthUser?.profilepic || "avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
          <p className="text-sm sm:text-base font-mono font-medium flex-grow text-gray-800 truncate">
            {unAuthUser?.username}
          </p>
          <UserPlus
            className="text-black hover:scale-110 transition-transform cursor-pointer"
            onClick={AddFriend}
          />
        </div>
      )}
    </div>
  );
}

export default SearchUser;
