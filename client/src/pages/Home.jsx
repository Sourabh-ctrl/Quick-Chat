import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const Home = () => {
   const { selectedUser } = useContext(ChatContext)

  return (
    <div className='h-screen w-full border sm:px-[15%] sm:py-[5%] '>
   <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hiddden h-[100%] grid grid-cols-1 relative ${selectedUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2" } `}>
    <Sidebar  />
    <Chat />
    <RightSidebar />

   </div>

    </div>
  )
}

export default Home