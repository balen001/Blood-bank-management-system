import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Settings from './pages/Settings'
import About from './pages/About'


function Logout(){
  localStorage.clear()
  return <Navigate to={"/login"}/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="*" element={<NotFound/>}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
