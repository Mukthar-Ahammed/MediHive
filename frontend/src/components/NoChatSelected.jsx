import React from 'react';
import { MessageSquare } from 'lucide-react';

function NoChatSelected() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 border-t-2 border-r-2 border-l-2 border-b-2 rounded-2xl border-black/10">
      <div className="w-full max-w-md h-96  rounded-3xl flex flex-col items-center justify-center text-center  transition">
        <MessageSquare className="text-gray-700 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-8 animate-bounce" />
        <p className="text-base sm:text-lg md:text-xl font-mono font-semibold text-gray-700 px-6">
          Select a chat to start messaging
        </p>
      </div>
    </div>
  );
}

export default NoChatSelected;
