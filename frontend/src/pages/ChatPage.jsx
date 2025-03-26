import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'

function ChatPage() {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen w-auto bg-base-200 flex items-center justify-center p-2 sm:p-4 ">
      <div className="bg-base-100 rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)] flex overflow-hidden">
        <div className="hidden md:block w-1/4">
          <Sidebar />
        </div>

        
        <div className="flex-1 h-full">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
