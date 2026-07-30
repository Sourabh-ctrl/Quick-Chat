import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUser } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image));
  }, [messages]);

  return selectedUser && (
    <div className={`h-full border-l border-white/5 bg-slate-900/40 relative flex flex-col transition-all duration-300 ${selectedUser ? "max-md:hidden" : "hidden"}`}>
      
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Profile Info */}
        <div className='pt-12 pb-6 px-6 flex flex-col items-center text-center'>
          <div className="relative mb-4">
            <img 
              src={selectedUser?.profilePic || assets.avatar_icon} 
              alt="Profile"
              className='w-24 h-24 object-cover rounded-full ring-4 ring-slate-800 shadow-xl' 
            />
            {onlineUser.includes(selectedUser._id) && (
              <span className="absolute bottom-1 right-1 w-5 h-5 border-4 border-slate-900 rounded-full bg-emerald-500"></span>
            )}
          </div>
          
          <h1 className='text-xl font-semibold text-white tracking-wide drop-shadow-sm'>
            {selectedUser.fullName}
          </h1>
          <p className='text-sm text-slate-400 mt-2 max-w-[200px]'>
            {selectedUser.bio || "Available"}
          </p>
        </div>

        <div className="h-[1px] bg-white/5 mx-6"></div>
        
        {/* Shared Media */}
        <div className='p-6'>
          <h3 className='text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4'>Shared Media</h3>
          
          {msgImages.length > 0 ? (
            <div className='grid grid-cols-3 gap-2'>
              {msgImages.map((url, index) => (
                <div 
                  key={index} 
                  onClick={() => window.open(url)} 
                  className="aspect-square cursor-pointer overflow-hidden rounded-xl border border-white/5 group bg-slate-800 shadow-sm"
                >
                  <img 
                    src={url} 
                    alt="Shared Media"  
                    className='w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-300 opacity-90 group-hover:opacity-100'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-800/30 rounded-xl border border-white/5 shadow-inner">
              <p className="text-xs text-slate-500">No media shared yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Logout Area */}
      <div className="p-6 mt-auto">
        <button 
          onClick={logout} 
          className='w-full py-3 px-6 bg-slate-800/80 hover:bg-red-500/15 text-slate-300 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all duration-200 rounded-xl text-sm font-medium shadow-md'
        >
          Log Out
        </button>
      </div>

    </div>
  )
}

export default RightSidebar