import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Header from '../components/Header'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from '../components/ProtectedRoute'

const Home = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Home
