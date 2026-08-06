import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets"; 
import { formatDate } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import {
  Send,
  Image as ImageIcon,
  ArrowLeft,
  Phone,
  Video,
  Info,
  CheckCheck,
  Check,
  Sparkles,
  Maximize2,
  X,
  Smile,
  MessageCircle,
} from "lucide-react";

const QuickEmojiSelector = ({ onSelect }) => {
  const emojis = ["👍", "❤️", "🔥", "😊", "🎉", "🙌", "🚀", "😂"];
  return (
    <div className="flex items-center gap-1 bg-slate-900/90 border border-white/10 p-1.5 rounded-full backdrop-blur-xl shadow-xl animate-scale-in">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className="hover:scale-125 transition-transform p-1 text-base leading-none cursor-pointer"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

const Chat = () => {
  const scrollend = useRef();

  const { authUser, onlineUser } = useContext(AuthContext);
  const { messages, setSelectedUser, selectedUser, sendMessage } =
    useContext(ChatContext);

  const [input, setInput] = useState("");
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      return null;
    }
    await sendMessage({ text: input.trim() });
    setInput("");
    setShowEmojiPicker(false);
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

  const isOnline = selectedUser && onlineUser.includes(selectedUser._id);

  return selectedUser ? (
    <div className="h-full relative flex flex-col bg-slate-950/40 backdrop-blur-2xl border-x border-white/10 overflow-hidden">
      {/* --- Chat Header --- */}
      <div className="flex items-center justify-between py-3.5 px-4 sm:px-6 border-b border-white/10 bg-slate-900/60 z-10 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <button 
            onClick={() => setSelectedUser(null)} 
            className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <img
              src={selectedUser.profilePic || assets.avatar_icon}
              alt="Profile"
              className="w-10 h-10 object-cover rounded-xl border border-white/15 shadow-md bg-slate-800"
            />
            {isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm"></span>
            )}
          </div>
          
          <div className="flex flex-col">
            <p className="text-sm sm:text-base font-semibold text-slate-100 flex items-center gap-2">
              {selectedUser.fullName}
            </p>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              {isOnline ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-emerald-400">Active Now</span>
                </>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>

        {/* Action Header Icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={() => toast("Calling feature coming soon!", { icon: "📞" })}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors"
            title="Start Audio Call"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button 
            onClick={() => toast("Video call coming soon!", { icon: "📹" })}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors"
            title="Start Video Call"
          >
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* --- Chat Messages Section --- */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 my-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl animate-float">
              <MessageCircle className="w-10 h-10" />
            </div>
            <div className="text-center max-w-sm">
              <p className="text-base text-slate-200 font-semibold mb-1">No messages yet</p>
              <p className="text-xs text-slate-400">
                Start the conversation with {selectedUser.fullName.split(" ")[0]}! Send a friendly wave or a message below.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {["👋 Say Hello", "📷 Send Photo", "✨ How are you?"].map((quickText) => (
                <button
                  key={quickText}
                  onClick={() => sendMessage({ text: quickText })}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-all cursor-pointer"
                >
                  {quickText}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === authUser._id;
            
            return (
              <div
                className={`flex items-end gap-2.5 ${isMe ? "justify-end" : "justify-start"} animate-slide-up`}
                key={msg._id || `${msg.senderId}-${msg.createdAt}`}
              >
                {!isMe && (
                  <img
                    src={selectedUser.profilePic || assets.avatar_icon}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg shadow-sm mb-4 object-cover border border-white/10"
                  />
                )}

                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[80%] sm:max-w-[70%]`}>
                  {msg.image ? (
                    <div 
                      onClick={() => setActiveImageModal(msg.image)}
                      className="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/15 shadow-xl my-1"
                    >
                      <img
                        src={msg.image}
                        alt="Uploaded content"
                        className="max-w-[260px] sm:max-w-[320px] max-h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <Maximize2 className="w-6 h-6" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-2.5 text-xs sm:text-sm break-words shadow-lg ${
                        isMe
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-xs border border-indigo-400/30 shadow-indigo-500/10"
                          : "bg-slate-900/90 text-slate-100 border border-white/10 rounded-2xl rounded-bl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1.5 mt-1 px-1">
                    <span className="text-[10px] text-slate-400">
                      {formatDate(msg.createdAt)}
                    </span>
                    {isMe && (
                      <CheckCheck className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                  </div>
                </div>

                {isMe && (
                  <img
                    src={authUser.profilePic || assets.avatar_icon}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg shadow-sm mb-4 object-cover border border-white/10"
                  />
                )}
              </div>
            );
          })
        )}
        <div ref={scrollend}></div>
      </div>

      {/* Quick Emoji Bar Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-20 left-6 z-20">
          <QuickEmojiSelector onSelect={(emoji) => setInput((prev) => prev + emoji)} />
        </div>
      )}

      {/* --- Bottom Input Area --- */}
      <div className="p-3 sm:p-4 bg-slate-900/80 border-t border-white/10 backdrop-blur-xl">
        <form 
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 sm:gap-3 bg-slate-950/70 border border-white/10 px-3 py-2 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all shadow-inner"
        >
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageUpload}
            hidden
          />
          
          <label 
            htmlFor="image" 
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer shrink-0"
            title="Attach Image"
          >
            <ImageIcon className="w-5 h-5" />
          </label>

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-amber-400 transition-colors cursor-pointer shrink-0"
            title="Emoji selector"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            autoComplete="off"
            type="text"
            placeholder={`Message ${selectedUser.fullName.split(" ")[0]}...`}
            className="flex-1 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none py-1 px-1"
          />
          
          <button 
            type="submit"
            disabled={!input.trim()}
            className="shrink-0 p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:hover:from-indigo-500 text-white transition-all shadow-lg shadow-indigo-500/25 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Lightbox Image Preview Modal */}
      {activeImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={() => setActiveImageModal(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImageModal}
            alt="Enlarged shared image"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  ) : (
    /* --- Fallback when no user is selected --- */
    <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400 bg-slate-950/40 backdrop-blur-2xl border-x border-white/10 max-md:hidden p-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl animate-float">
          <Sparkles className="w-10 h-10" />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-100 tracking-wide mb-1">
          Welcome to QuickChat
        </h2>
        <p className="text-xs text-slate-400 max-w-xs">
          Select a contact from the sidebar on the left to start sending real-time messages and photos.
        </p>
      </div>
    </div>
  );
};

export default Chat;