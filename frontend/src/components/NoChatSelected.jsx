import React from 'react'
import { MessageSquare } from 'lucide-react'

function NoChatSelected() {
  return (
    <div className='w-full h-full sm:w-400 fixed md:absolute left-105 top-14 flex items-center'>
        <div className='w-300 bg-black/10 rounded-3xl h-full flex items-center justify-center flex-col'>
            <MessageSquare className='text-gray-800 w-40 h-40 mb-20 animate-bounce'/>
            <p className='text-2xl font-mono top-126 absolute w-150 left-100 font-semibold text-gray-800'>Select a chat to start messaging</p>

        </div>
       
    </div>
  )
}

export default NoChatSelected
