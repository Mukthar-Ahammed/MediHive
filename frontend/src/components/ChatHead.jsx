import React from 'react';
import { useChatStore } from '../store/useChatStore';

function ChatHead() {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full h-16 sm:h-20 bg-white/90 shadow flex items-center px-4 sm:px-6 rounded-3xl border-b-2 border-l-2 border-r-2 border-t-2 border-gray-200">
      <img
        src={selectedUser?.profilepic || "/avatar.png"}
        alt="User Avatar"
        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border border-gray-300"
      />
      <p className="ml-4 font-mono font-semibold text-base sm:text-lg text-gray-800 truncate">
        {selectedUser?.username}
      </p>
    </div>
  );
}

export default ChatHead;
