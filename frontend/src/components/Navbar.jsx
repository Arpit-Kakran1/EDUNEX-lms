import React, { useState } from 'react'
import logo from '../assets/logo.png'
import useCurrentUser from '../hooks/useCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { serverURl } from '../utils/ServerUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import { GiHamburgerMenu } from "react-icons/gi";
import { GiSplitCross } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData);
  console.log(user)
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  console.log(user?.role)
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${serverURl}/api/auth/logout`, {}, { withCredentials: true });

      dispatch(setUserData(null));

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="w-[100%] h-18 bg-gradient-to-r from-black via-gray-800 to-gray-600 flex top-0 fixed py-10 items-center justify-between">
      <div className='py-10 px-10'>
        <img src={logo} alt="" className='w-13 h-13 rounded-4xl' />
      </div>

      <div className='lg:flex relative justify-center p-8 gap-4 hidden'>
        {user ? <span className='flex justify-center items-center text-lg font-semibold uppercase rounded-full text-center h-10 w-10 text-white bg-gray-800 cursor-pointer '
          onClick={() => setShow(show => !show)}
        >
          {user?.name[0]}
        </span> : <FaUserCircle className='h-8 w-8 fill-white border-black border-2 rounded-full cursor-pointer' onClick={() => navigate("/signup")} />}
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

        {show ? <div className='absolute top-25 flex flex-col left-15 bg-gradient-to-b from-gray-500 to-gray-800 border-black px-2 py-1 rounded-sm'>
          <span className='border-black border-2 px-2 rounded-sm hover:bg-gray-800 text-white border-gray-200 cursor-pointer'
            onClick={() => navigate("/profile")}>
            My Profile
          </span>
          <span className='border-gray-200 border-2 px-2 rounded-sm mt-1 hover:bg-gray-800 text-white cursor-pointer overflow-auto' onClick={() => navigate("/mycourses")}>
            My Courses
          </span>
        </div> : ""}
      </div>
      {/* Responsive hamburger menu show or hide */}
      <GiHamburgerMenu className='lg:hidden m-3 fill-white w-7 h-7'
        onClick={() => setShowHam(showHam => !showHam)}
      />

      <div className={`fixed top-0 left-0 w-[40vh] h-[100vh] bg-[#000000d6] flex items-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-0 transition duration-600" : "translate-x-[-100%] transition duration-500"}`}>
        <GiSplitCross className='w-8 h-8 fill-white absolute top-5 right-1' onClick={() => setShowHam(setShowHam => !setShowHam)} />

        <div className='flex relative justify-center p-8 gap-4 flex-col my-10'>

          {user ? <span className='flex justify-center items-center  text-2xl font-semibold uppercase rounded-full text-center h-13 w-13 text-black bg-gray-300 cursor-pointer mx-5'
          >
            {user?.name[0]}
          </span> : <FaUserCircle className='h-8 w-8 fill-white cursor-pointer' />}

          {user ?
            <span className='rounded-sm cursor-pointer border-2 py-1 px-2 border-white m-auto p-auto text-white bg-gray-800 hover:bg-gray-500'>
              My Profile
            </span> : ""}
          {user ? <span className='rounded-sm cursor-pointer border-2 py-1 px-2 border-white m-auto p-auto text-white bg-gray-800 hover:bg-gray-500'>
            My Courses
          </span> : ""}
          {
            user?.role === "teacher" ? <span className='rounded-sm cursor-pointer border-2 py-1 px-2 border-white m-auto p-auto text-white bg-gray-800 hover:bg-gray-500'>
              Dashboard
            </span> : ""
          }
          {user ? <span className='rounded-sm cursor-pointer bg-gray-800 shadow-2xl hover:bg-red-500 font-medium py-1 px-2  m-auto p-auto text-white border-black'
            onClick={handleLogout}
          >
            Logout
          </span> : <span className='rounded-sm cursor-pointer bg-gray-800 shadow-2xl hover:bg-blue-500 font-medium py-1 px-2  m-auto p-auto text-white'
            onClick={() => navigate("/login")}
          >
            Login
          </span>}


        </div>
      </div>
    </nav>
  )
}

export default Navbar
