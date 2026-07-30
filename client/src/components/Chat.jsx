import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets"; 
import { formatDate } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Chat = () => {
  const scrollend = useRef();

  const { authUser, onlineUser } = useContext(AuthContext);
  const { messages, setSelectedUser, selectedUser, sendMessage } =
    useContext(ChatContext);

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return null;
    }
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
      setInput("");
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (scrollend.current && messages) {
      scrollend.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full relative flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      {/* --- Chat Header --- */}
      <div className="flex items-center gap-4 py-4 px-6 border-b border-white/10 bg-black/20 z-10">
        <div className="relative">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-10 h-10 object-cover rounded-full border border-gray-600"
          />
          {/* Green dot only shows if online */}
          {onlineUser.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
          )}
        </div>
        
        <div className="flex-1 flex flex-col">
          <p className="text-lg font-semibold text-white tracking-wide">
            {selectedUser.fullName}
          </p>
          {/* Text only shows if online */}
          {onlineUser.includes(selectedUser._id) && (
            <p className="text-xs text-green-400 font-medium">Online</p>
          )}
        </div>

        <button 
          onClick={() => setSelectedUser(null)} 
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <img src={assets.arrow_icon} alt="Back" className="w-5 h-5" />
        </button>
        <img src={assets.help_icon} alt="Help" className="max-md:hidden w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
      </div>

      {/* --- Chat Messages Section --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        
        {/* Empty State */}
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-80 mt-10">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl shadow-inner border border-white/5">
              👋
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-200 font-medium mb-1">No conversation yet</p>
              <p className="text-sm">Send a message to start chatting with {selectedUser.fullName.split(' ')[0]}!</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === authUser._id;
            
            return (
              <div
                className={`flex items-end gap-3 ${isMe ? "justify-end" : "justify-start"}`}
                key={msg._id || `${msg.senderId}-${msg.createdAt}`}
              >
                {!isMe && (
                  <img
                    src={selectedUser.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-8 h-8 rounded-full shadow-sm mb-5"
                  />
                )}

                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  {msg.image ? (
                    <img
                      src={msg.image}
                      alt="Uploaded content"
                      className="max-w-[240px] md:max-w-[300px] border border-white/10 shadow-lg overflow-hidden rounded-xl mb-1 object-cover"
                    />
                  ) : (
                    <div
                      className={`px-4 py-2.5 max-w-[240px] md:max-w-[320px] text-sm md:text-base break-words shadow-lg ${
                        isMe
                          ? "bg-gradient-to-tr from-violet-600 to-indigo-500 text-white rounded-2xl rounded-br-sm"
                          : "bg-gray-800/80 text-gray-100 border border-gray-700 rounded-2xl rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                {isMe && (
                  <img
                    src={authUser.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-8 h-8 rounded-full shadow-sm mb-5"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={scrollend}></div>
      </div>

      {/* --- Bottom Input Area --- */}
      <div className="p-4 bg-black/20 border-t border-white/10 backdrop-blur-md">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-3 bg-gray-900/50 border border-white/10 px-4 py-2 rounded-full focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all shadow-inner"
        >
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            hidden
          />
          <label htmlFor="image" className="cursor-pointer group flex-shrink-0">
            <img
              src={assets.gallery_icon}
              alt="Upload"
              className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </label>
          
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoComplete="off"
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none py-2 px-2"
          />
          
          <button 
            type="submit"
            disabled={!input.trim()}
            className="flex-shrink-0 p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:opacity-50 transition-colors shadow-md"
          >
            <img
              src={assets.send_button}
              alt="Send"
              className="w-4 h-4 ml-0.5 invert" 
            />
          </button>
        </form>
      </div>
    </div>
  ) : (
    /* --- Fallback when no user is selected --- */
    <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-md:hidden">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-lg">
        <img className="max-w-12 opacity-80" src={assets.logo_icon} alt="Logo" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-white tracking-wide mb-1">Welcome back</h2>
        <p className="text-sm font-medium text-gray-400">Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default Chat;