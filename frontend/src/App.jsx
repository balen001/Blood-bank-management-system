import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import DonationHistory from './pages/Donor/DonationHistory'
import TransfusionHistory from './pages/Patient/TransfusionHistory'
import Appointments from './pages/Appointments'
import Account from './pages/Account'
import Notifications from './pages/Notifications'
import AddReceptionist from './pages/Admin/AddReceptionist'
import AddDoctor from './pages/Admin/AddDoctor'
import AddHospital from './pages/Admin/AddHospital'


function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/donationhistory" element={<ProtectedRoute><DonationHistory /></ProtectedRoute>} />
        <Route path="/transfusionhistory" element={<ProtectedRoute><TransfusionHistory /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
        <Route path="/addReceptionist" element={<ProtectedRoute><AddReceptionist/></ProtectedRoute>} />
        <Route path="/addDoctor" element={<ProtectedRoute><AddDoctor/></ProtectedRoute>} />
        <Route path="/addHospital" element={<ProtectedRoute><AddHospital/></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
