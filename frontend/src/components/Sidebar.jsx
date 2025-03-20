import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SideLoad from "./SideLoad";
import { Users } from "lucide-react";
import SearchUser from "./SearchUser";

function Sidebar() {
  const { selectedUser, isUserLoading, getUsers, users, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div
      className="w-full sm:w-[350px] p-3 bg-black/10 left-0 h-full top-14 fixed rounded-3xl  overflow-y-auto no-scrollbar shadow-lg"
    >
     
      <SearchUser/>
      
      <div className="h-full w-full px-2 py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
            }}
            className={`flex  items-center gap-4 mt-5 p-3 w-full rounded-xl transition-all duration-100 hover:bg-gray-800 hover:text-white shadow-lg border-t-2 border-black/10
              ${
                selectedUser?._id === user._id
                  ? "bg-gray-800 text-white"
                  : "text-gray-800" 
              }
            `}
          >           
            <img
              src={user.profilepic || "/avatar.png"}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover "
              alt="profile pic"
            />
            <p className="text-sm sm:text-base font-semibold ">
              {user.username}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
