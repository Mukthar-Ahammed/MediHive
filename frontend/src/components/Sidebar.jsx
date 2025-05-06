import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SearchUser from "./SearchUser";
import Loader from "./Loader"

function Sidebar() {
  const { selectedUser, isUserLoading, getUsers, users, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-full sm:w-[300px] p-3 bg-white h-full rounded-3xl shadow-xl overflow-y-auto no-scrollbar border border-gray-200 ">
      <SearchUser />

      <div className="mt-4 space-y-3 flex ">
        {isUserLoading ? (
          <div className="text-center text-gray-500 font-mono text-sm ">Fetching Friends</div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-150 shadow-sm border hover:shadow-md
                ${
                  selectedUser?._id === user._id
                    ? "bg-black text-white border-transparent"
                    : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              <img
                src={user.profilepic || "/avatar.png"}
                alt="profile"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-300"
              />
              <p className="text-sm sm:text-base font-semibold truncate text-left">
                {user.username}
              </p>
            </button>
          ))
        ) : (
          <div className="text-center text-gray-500 font-mono text-sm">No users found</div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
