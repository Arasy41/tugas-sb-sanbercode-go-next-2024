import { useState } from 'react'
import './App.css'
import AuthProvider from './contexts/AuthContext'
import ReviewProvider from './contexts/ReviewContext'
import Header from './components/Layout/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <ReviewProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ReviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
