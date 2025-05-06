import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHead from "./ChatHead";
import { useAuthStore } from "../store/useAuthStore";

function ChatContainer() {
  const {
    selectedUser,
    messages = [],
    getMessage,
    isMessageLoading,
    subscribetoMessages,
    unsubscribefromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessage(selectedUser._id);
    }
    subscribetoMessages();
    return () => unsubscribefromMessages();
  }, [
    selectedUser?._id,
    getMessage,
    subscribetoMessages,
    unsubscribefromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col  rounded-3xl shadow-lg overflow-hidden ">
      <ChatHead />

      <div className="flex-1 overflow-y-auto  py-4  bg-gray-50 ">
        {messages.map((message, index) => {
          const isSender = message.senderId === authUser._id;
          const profilePic = isSender
            ? authUser.profilepic || "/avatar.png"
            : selectedUser.profilepic || "/avatar.png";

          return (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? messageEndRef : null}
              className={`flex items-end gap-2 px-1 sm:px-2 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Avatar (left) */}
              {!isSender && (
                <img
                  src={profilePic}
                  alt="Sender"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              )}

              {/* Message Bubble */}
              <div className="max-w-[85%] sm:max-w-[70%] md:max-w-[60%]">
                <div
                  className={`p-4 rounded-2xl text-sm break-words ${
                    isSender
                      ? "bg-black/10 text-black rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="message content"
                      className="w-full h-auto max-h-60 rounded-lg mb-2"
                    />
                  )}
                  {message.text && (
                    <p className="whitespace-pre-wrap leading-snug">
                      {message.text}
                    </p>
                  )}
                </div>
                <div
                  className={`text-[11px] text-gray-500 mt-1 ${
                    isSender ? "text-right" : ""
                  }`}
                >
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Avatar (right) */}
              {isSender && (
                <img
                  src={profilePic}
                  alt="You"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className=" px-4 py-3 ">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
