import React from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Cyber Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none animate-pulse-glow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none animate-float"></div>
      <div className="fixed top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-pink-600/10 blur-[100px] pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f293712_1px,transparent_1px),linear-gradient(to_bottom,#1f293712_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/update-profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App