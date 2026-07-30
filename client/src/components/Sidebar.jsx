import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";

const Sidebar = () => {
  const [input, setInput] = useState("");

  const { logout, onlineUser } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase()),
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const navigate = useNavigate();

  return (
    <div
      className={`h-full border-r border-white/5 bg-slate-900/40 flex flex-col transition-all duration-300 ${
        selectedUser ? "max-md:hidden" : "block"
      }`}
    >
      {/* Header Section */}
      <div className="p-5 flex flex-col gap-5 border-b border-white/5">
        <div className="flex justify-between items-center">
          <img className="h-8 object-contain drop-shadow-md" src={assets.logo} alt="logo" />
          <div className="relative group">
            <div className="p-2 hover:bg-slate-800 rounded-full cursor-pointer transition-all duration-200">
              <img src={assets.menu_icon} alt="menu" className="h-5 w-5 opacity-90 group-hover:scale-110 group-hover:brightness-125 transition-all" />
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 z-20 w-40 p-2 rounded-xl bg-slate-800 border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p
                className="cursor-pointer text-sm text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-lg transition-colors"
                onClick={() => navigate("/update-profile")}
              >
                Edit Profile
              </p>
              <div className="h-[1px] bg-white/10 my-1"></div>
              <p 
                className="cursor-pointer text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 px-3 py-2 rounded-lg transition-colors" 
                onClick={() => logout()}
              >
                Log Out
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-950/50 border border-white/5 rounded-xl flex items-center gap-3 py-3 px-4 focus-within:ring-2 focus-within:ring-blue-500/50 transition-all shadow-inner">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60 brightness-110" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-slate-200 text-sm placeholder-slate-500 flex-1 w-full"
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-3 space-y-1">
        {filteredUsers.map((user) => (
          <div
            className={`relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedUser?._id === user._id 
                ? "bg-blue-500/15 text-white shadow-[inset_4px_0_0_0_#3b82f6]" // Blue left accent
                : "hover:bg-white/5 text-slate-300"
            }`}
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={user._id}
          >
            {/* Avatar with Online Badge */}
            <div className="relative flex-shrink-0">
              <img
                className="w-11 h-11 object-cover rounded-full bg-slate-800 shadow-md"
                src={user?.profilePic || assets.avatar_icon}
                alt="avatar"
              />
              {onlineUser.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-900 rounded-full bg-emerald-500"></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">
                {user.fullName}
              </p>
              <p className={`text-xs truncate mt-0.5 ${onlineUser.includes(user._id) ? "text-emerald-400/90" : "text-slate-500"}`}>
                {onlineUser.includes(user._id) ? "Online" : "Offline"}
              </p>
            </div>

            {/* Unread Badge */}
            {unseenMessages[user._id] > 0 && (
              <div className="flex-shrink-0 h-5 w-5 flex justify-center items-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-md shadow-blue-500/30">
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;