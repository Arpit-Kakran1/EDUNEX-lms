import React, { useState } from 'react'
import logo from '../assets/logo.png'
import useCurrentUser from '../hooks/useCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { serverURl } from '../utils/ServerUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';

const Navbar = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData?.user);
  console.log(user?.role)
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${serverURl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="w-[100%] h-18 bg-gradient-to-r from-black via-gray-800 to-gray-600 flex top-0 fixed py-10 items-center justify-between">
      <div className='py-10 px-10'>
        <img src={logo} alt="" className='w-13 h-13 rounded-4xl ' />
      </div>
      <div className='flex justify-center p-8 gap-4'>
        {user ? <span className=' flex justify-center items-center text-lg font-semibold uppercase rounded-full text-center h-13 w-13 text-white bg-black'>
          {user?.name[0]}
        </span> : ""}
        {
          user?.role === "teacher" ? <span className='rounded-sm cursor-pointer border-2 py-1 px-2 border-black m-auto p-auto text-white bg-gray-800'>
            Dashboard
          </span> : ""
        }
        {user ? <span className='rounded-sm cursor-pointer bg-gray-800 shadow-2xl hover:bg-red-500 font-medium py-1 px-2  m-auto p-auto text-white'
          onClick={handleLogout}
        >
          Logout
        </span> : <span className='rounded-sm cursor-pointer bg-gray-800 shadow-2xl hover:bg-blue-500 font-medium py-1 px-2  m-auto p-auto text-white'
          onClick={() => navigate("/login")}
        >
          Login
        </span>}
      </div>
    </nav>
  )
}

export default Navbar
