import React from 'react'
import Navbar from '../components/Navbar'
import NavbarAdmin from '../components/NavbarAdmin'
import JobDashboard from '../components/JobDashboard'
import { useAuthContext } from '../context/authContext'
import { useEffect } from 'react'
import { checkAuth } from '../utils/checkAuth'

const Home = () => {
  const {authUser, setAuthUser}=useAuthContext();

  useEffect(() => {
    checkAuth();
  }, [])
  

  return (
    <div>
      {authUser ? <NavbarAdmin/>: <Navbar/>}
      <JobDashboard/>
    </div>
  )
}

export default Home
