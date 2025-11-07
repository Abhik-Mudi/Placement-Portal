import React from 'react'
import { useNavigate } from 'react-router-dom'
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const {logout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
        await logout();
        navigate("/login")
    }
  return (
    <div className='flex justify-around bg-[#048a8a] text-white items-center w-full'>
      <h1 onClick={() => navigate("/")} className='text-3xl font-bold cursor-pointer mx-5 my-3'>Placement Portal</h1>
      <div>
        <button onClick={()=> navigate("/")} className='text-white px-5 py-2 rounded-full cursor-pointer'>Home</button>
        <button onClick={()=> navigate("/company")} className='text-white px-5 py-2 rounded-full cursor-pointer'>Companies</button>
        <button onClick={()=> navigate("/job")} className='text-white px-5 py-2 rounded-full cursor-pointer'>Jobs</button>
        <button onClick={handleLogout} className='text-white px-5 py-2 rounded-full cursor-pointer'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
