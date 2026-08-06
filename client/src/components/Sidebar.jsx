import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";
import { Search, MoreVertical, User, LogOut, MessageSquare, X, Sparkles, Circle } from "lucide-react";

const Sidebar = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "online"

  const { logout, onlineUser, authUser } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const navigate = useNavigate();

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(input.toLowerCase());
    const matchesTab = activeTab === "all" || (activeTab === "online" && onlineUser.includes(user._id));
    return matchesSearch && matchesTab;
  });

  const onlineCount = users.filter((u) => onlineUser.includes(u._id)).length;

  return (
    <div
      className={`h-full border-r border-white/10 bg-slate-950/60 backdrop-blur-2xl flex flex-col transition-all duration-300 ${
        selectedUser ? "max-md:hidden" : "block"
      }`}
    >
      {/* --- Top Header --- */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20">
                <img
                  src={authUser?.profilePic || assets.logo_icon}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-[10px] bg-slate-900"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-slate-950 rounded-full bg-emerald-500 shadow-sm"></span>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-1.5">
                {authUser?.fullName || "QuickChat"}
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </h3>
              <p className="text-xs text-slate-400">My Workspace</p>
            </div>
          </div>

          {/* Menu Dropdown */}
          <div className="relative group">
            <button className="p-2 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all duration-200 cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </button>

            <div className="absolute top-full right-0 mt-2 z-30 w-48 p-1.5 rounded-2xl glass-card border border-white/15 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 animate-scale-in">
              <button
                className="w-full flex items-center gap-2.5 text-xs font-medium text-slate-200 hover:bg-indigo-600/30 hover:text-indigo-200 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate("/update-profile")}
              >
                <User className="w-4 h-4 text-indigo-400" />
                Edit Profile
              </button>
              <div className="h-[1px] bg-white/10 my-1"></div>
              <button
                className="w-full flex items-center gap-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 px-3 py-2.5 rounded-xl transition-colors cursor-pointer"
                onClick={() => logout()}
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative bg-slate-900/80 border border-white/10 rounded-xl flex items-center gap-2.5 py-2.5 px-3.5 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/60 transition-all shadow-inner">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="bg-transparent border-none outline-none text-slate-200 text-xs sm:text-sm placeholder-slate-500 flex-1 w-full"
            placeholder="Search conversations..."
          />
          {input && (
            <button onClick={() => setInput("")} className="text-slate-500 hover:text-slate-300 p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Tabs / Filter */}
        <div className="flex items-center justify-between gap-1 p-1 bg-slate-900/50 rounded-xl border border-white/5 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all text-center cursor-pointer ${
              activeTab === "all"
                ? "bg-indigo-600/30 text-indigo-300 font-semibold border border-indigo-500/30 shadow-sm"
                : "hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            All Chats ({users.length})
          </button>
          <button
            onClick={() => setActiveTab("online")}
            className={`flex-1 py-1.5 px-3 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "online"
                ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm"
                : "hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Online ({onlineCount})
          </button>
        </div>
      </div>

      {/* --- User List --- */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-2">
            <MessageSquare className="w-8 h-8 opacity-40 text-slate-400 mb-1" />
            <p className="text-xs font-medium text-slate-400">No users found</p>
            <p className="text-[11px] text-slate-600">Try searching for a different name</p>
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUser.includes(user._id);
            const unread = unseenMessages[user._id] || 0;

            return (
              <div
                className={`relative flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer transition-all duration-200 group ${
                  isSelected
                    ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/20 border border-indigo-500/40 text-white shadow-lg shadow-indigo-500/10"
                    : "hover:bg-white/5 border border-transparent text-slate-300 hover:text-slate-100"
                }`}
                onClick={() => {
                  setSelectedUser(user);
                  setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
                }}
                key={user._id}
              >
                {/* Avatar with Online Ring */}
                <div className="relative shrink-0">
                  <img
                    className={`w-11 h-11 object-cover rounded-xl bg-slate-800 ring-2 transition-all ${
                      isOnline
                        ? "ring-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        : "ring-white/10"
                    }`}
                    src={user?.profilePic || assets.avatar_icon}
                    alt="avatar"
                  />
                  {isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-slate-950 rounded-full bg-emerald-500"></span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-xs sm:text-sm truncate group-hover:text-white transition-colors">
                      {user.fullName}
                    </p>
                    {isOnline && (
                      <span className="text-[10px] text-emerald-400 font-medium px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        Online
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {user.bio || "Available on QuickChat"}
                  </p>
                </div>

                {/* Unread Badge */}
                {unread > 0 && (
                  <div className="shrink-0 h-5 min-w-5 px-1.5 flex justify-center items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-bold text-white shadow-md shadow-indigo-500/40 animate-pulse">
                    {unread}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;