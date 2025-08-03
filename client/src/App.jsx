import React from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const App = () => {
   const {authUser} = useContext(AuthContext);
  return (
    <div className="bg-[url('/bgImage.svg')] bg-contain ">
      <Toaster/>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ?  <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/update-profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App