import React from 'react'
import { useChatStore } from '../store/useChatStore'

function ChatHead() {
  const { selectedUser } = useChatStore()

  return (
    <div className="w-full h-16  bg-black/10 shadow-md flex items-center px-4 rounded-t-3xl">
      <img
        src={selectedUser?.profilepic || "/avatar.png"}
        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full"
      />
      <p className="ml-4 font-mono font-semibold text-lg sm:text-xl text-gray-800">
        {selectedUser?.username}
      </p>
    </div>
  )
}

export default ChatHead
