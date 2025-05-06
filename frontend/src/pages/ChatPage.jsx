import React, { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';

function ChatPage() {
  const { selectedUser } = useChatStore();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen p-2 sm:p-4">
      {/* Main container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-full mx-auto rounded-xl shadow-lg overflow-hidden ">
        
        {/* Mobile toggle button */}
        <div className="md:hidden p-2">
          <button
            onClick={() => setShowSidebar(prev => !prev)}
            className="px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded-md shadow"
          >
            {showSidebar ? 'Hide' : 'Show'} Chats
          </button>
        </div>

        {/* Sidebar: toggled on mobile, always visible on md+ */}
        {(showSidebar || window.innerWidth >= 768) && (
          <div className="w-full md:w-[30%] h-full border-r border-gray-200">
            <Sidebar />
          </div>
        )}

        {/* Chat container */}
        <div className="w-full md:w-[70%] h-full relative  rounded-3xl ">
          <div className="absolute inset-0 overflow-y-auto">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
