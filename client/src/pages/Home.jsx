import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Header from '../components/Header'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from '../components/ProtectedRoute'

const Home = () => {
  return <h1>Hello</h1>
}

export default Home
