import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import { useAuthContext } from './context/authContext'

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Home/>:<Login/>}/>
        <Route path='/login' element={ <Login/>} />
        <Route path='/login-failed' element={<div>Login failed. Please try again</div>} />
      </Routes>
    </div>
  )
}

export default App
