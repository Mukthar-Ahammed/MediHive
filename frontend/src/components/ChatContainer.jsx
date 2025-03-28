import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageInput from './MessageInput'
import ChatHead from './ChatHead'
import { useAuthStore } from '../store/useAuthStore'



function ChatContainer() {
  const { selectedUser, messages=[], getMessage, isMessageLoading ,subscribetoMessages,unsubscribefromMessages} = useChatStore()
  const{authUser}=useAuthStore()
  const messageendRef=useRef(null)

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
    }
    subscribetoMessages()
    return ()=>unsubscribefromMessages()
  }, [selectedUser?._id, getMessage,subscribetoMessages,unsubscribefromMessages,]);

  useEffect(()=>{
    if(messageendRef.current){
      messageendRef.current.scrollIntoView({behaviour:"smooth"})
    }
  },[messages])
  

  return (
    <div className="w-full h-full flex flex-col md:w-300 fixed top-14 right-10    mx-auto   bg-gray-100 shadow-lg rounded-3xl overflow-hidden p-1 ">
     
      <ChatHead />

     
      <div className="flex-col overflow-y-auto p-4  text-black no-scrollbar">
        {messages.map((message)=>
        <div
        key={message._id}
        className={`chat ${message.senderId==authUser._id?"chat-end":"chat-start"}   `}
        ref={messageendRef}
        >
          
        <div >
          <div className='rounded-3xl size-17 pt-12 '>
            <img
            className='size-12 rounded-3xl'
            src={`${message.senderId==authUser._id?   authUser.profilepic || "avatar.png":selectedUser.profilepic||"avatar.png"}`}
            alt='profilepic'
            />
          </div>

        </div>
     
      <div className='chat-header mb-1'>
  
        <time
        className='text-xs opacity-40 ml-1 mb-12 mr-5'
        >
          {new Date (message.createdAt).toLocaleTimeString()}
        </time>
      </div>
      <div className='chat-bubble flex-col p-2  relative mb-34 mr-4  rounded-2xl border-gray-900 bg-gray-900 text-white'> 
          {message.image && (
            <img
            src={message.image}
            className='
            w-80 h-80 
            '
            />
          )}
          {message.text &&
            <p>{message.text}</p>
          }

      </div>
      </div>
        )}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
