import { useState } from 'react'
import './App.css'
import ReviewProvider from './contexts/ReviewContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NavBar from './components/Layout/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <ReviewProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </BrowserRouter>
        </ReviewProvider>
      </AuthProvider>
    </>
  )
}

export default App
