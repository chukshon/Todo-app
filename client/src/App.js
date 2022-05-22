import { useEffect } from 'react'
import './main.scss'
import { AppProvider } from './context/appContext'
import Home from './pages/Home'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  )
}

export default App
