import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const Home = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    <div className='h-screen w-full p-2 sm:p-4 lg:p-6 flex items-center justify-center relative z-10'>
      <div className={`w-full max-w-7xl h-full max-h-[92vh] glass-panel rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden grid grid-cols-1 relative transition-all duration-300 ${
        selectedUser 
          ? "md:grid-cols-[300px_1fr_300px] lg:grid-cols-[340px_1fr_340px]" 
          : "md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr]"
      }`}>
        <Sidebar />
        <Chat />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Home