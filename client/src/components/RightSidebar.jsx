import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Bell,
  BellOff,
  ShieldAlert,
  Share2,
  Image as ImageIcon,
  LogOut,
  X,
  Maximize2,
  Lock,
  Mail,
  User,
} from 'lucide-react';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUser } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMediaModal, setActiveMediaModal] = useState(null);

  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image));
  }, [messages]);

  const isOnline = selectedUser && onlineUser.includes(selectedUser._id);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? "Notifications unmuted" : "Notifications muted");
  };

  const handleShareProfile = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(selectedUser.fullName);
      toast.success("Contact name copied to clipboard!");
    }
  };

  return selectedUser && (
    <div className={`h-full border-l border-white/10 bg-slate-950/60 backdrop-blur-2xl relative flex flex-col transition-all duration-300 ${selectedUser ? "max-md:hidden" : "hidden"}`}>
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
        {/* Profile Info Card */}
        <div className='pt-4 pb-2 flex flex-col items-center text-center'>
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 shadow-xl shadow-indigo-500/20">
              <img 
                src={selectedUser?.profilePic || assets.avatar_icon} 
                alt="Profile"
                className='w-full h-full object-cover rounded-[14px] bg-slate-900' 
              />
            </div>
            {isOnline && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 border-3 border-slate-950 rounded-full bg-emerald-500 shadow-sm"></span>
            )}
          </div>
          
          <h2 className='text-base sm:text-lg font-bold text-slate-100 tracking-wide'>
            {selectedUser.fullName}
          </h2>
          <p className='text-xs text-slate-400 mt-1 max-w-[200px] leading-relaxed'>
            {selectedUser.bio || "Available on QuickChat"}
          </p>

          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/5">
            <Mail className="w-3 h-3 text-indigo-400" />
            <span className="truncate max-w-[170px]">{selectedUser.email || "user@quickchat.dev"}</span>
          </div>
        </div>

        {/* Quick Action Controls */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={toggleMute}
            className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-xs ${
              isMuted 
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300" 
                : "bg-slate-900/60 border-white/10 hover:bg-white/10 text-slate-300"
            }`}
          >
            {isMuted ? <BellOff className="w-4 h-4 text-amber-400" /> : <Bell className="w-4 h-4 text-indigo-400" />}
            <span className="text-[10px]">{isMuted ? "Muted" : "Mute"}</span>
          </button>

          <button 
            onClick={handleShareProfile}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 hover:bg-white/10 text-slate-300 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-xs"
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px]">Share</span>
          </button>

          <button 
            onClick={() => toast.error("User block feature coming soon")}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-xs"
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span className="text-[10px]">Block</span>
          </button>
        </div>

        <div className="h-[1px] bg-white/10"></div>
        
        {/* Shared Media Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className='text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5'>
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
              Shared Media
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {msgImages.length}
            </span>
          </div>
          
          {msgImages.length > 0 ? (
            <div className='grid grid-cols-3 gap-2'>
              {msgImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => setActiveMediaModal(url)} 
                  className="aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/10 group bg-slate-900 relative shadow-sm"
                >
                  <img 
                    src={url} 
                    alt="Shared Media"  
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-900/40 rounded-xl border border-white/5 shadow-inner">
              <p className="text-xs text-slate-500">No photos shared yet</p>
            </div>
          )}
        </div>

        {/* Security Info */}
        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-2.5 text-xs text-indigo-200/80">
          <Lock className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            Messages & attachments are end-to-end secured on QuickChat.
          </p>
        </div>
      </div>

      {/* Bottom Logout Button */}
      <div className="p-4 border-t border-white/10 bg-slate-900/40 mt-auto">
        <button 
          onClick={logout} 
          className='w-full py-2.5 px-4 bg-slate-900 hover:bg-rose-500/15 text-slate-300 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 transition-all duration-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer'
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          Log Out
        </button>
      </div>

      {/* Lightbox Media Modal */}
      {activeMediaModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={() => setActiveMediaModal(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeMediaModal}
            alt="Shared media enlarged"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  )
}

export default RightSidebar