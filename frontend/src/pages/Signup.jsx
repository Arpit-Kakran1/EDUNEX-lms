import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { IoEye, IoEyeOff, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverURl } from '../utils/ServerUrl';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("Success")
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    try {
      if (!formData.name || !formData.email || !formData.password || !formData.role)
        return alert("All fields are required");

      e.preventDefault();

      const res = await axios.post(`${serverURl}/api/auth/signup`, formData, { withCredentials: true });
      dispatch(setUserData(res.data.user));
      setFormData({
        name: "",
        email: "",
        password: "",
        role: ""
      })
      setMessage(res.data.message || "Account created successfully");
      setOpen(true);
      setSeverity("success")
    } catch (error) {
      console.log(error)
      setMessage(error?.response?.data?.message || "Signup failed!");
      setOpen(true);
      setSeverity("error")
    }
    finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
      <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-2xl rounded-2xl flex'>
        {/* Left Side div */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center'>

          <div className='p-10'>
            <h1 className='text-2xl font-semibold text-black'>Let's get Started</h1>
            <h2 className='text-xl text-gray-400'>Create your Account</h2>
          </div>

          {/* input and label fields */}
          <div className='flex flex-col gap-2'>

            <div className='flex flex-col gap-2 justify-start m-2'>
              <label className='text-black text-md'>Name</label>
              <input type="text"
                placeholder='enter your name'
                className='bg-gray-100 rounded-md px-1 hover:bg-gray-300'
                onChange={handleChange}
                value={formData.name}
                id='name'
                name='name'
              />
            </div>

            <div className='flex flex-col gap-2 justify-start m-2'>

              <label className='text-black text-md'>Email</label>
              <input type="email" placeholder='enter @email' className='bg-gray-100 rounded-md px-1 hover:bg-gray-300'
                value={formData.email}
                name='email'
                onChange={handleChange}
              />
            </div>

            <div className=' flex flex-col gap-2 justify-start m-2'>
              <label className='text-black text-md'>Password</label>
              <div className='relative'>
                <input type={showPassword ? "text" : "password"}
                  placeholder='enter **password**'
                  className='bg-gray-100  rounded-md px-1 hover:bg-gray-300'
                  value={formData.password}
                  id='password'
                  name='password'
                  onChange={handleChange}
                >
                </input>
                <span
                  className="absolute right-2 top-2 cursor-pointer text-gray-600 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? < IoEye /> : <IoEyeOff />}
                </span>
              </div>
            </div>
          </div>

          <div className='flex md:w-[50%] items-center justify-between py-6 gap-2' >
            <span onClick={() => setFormData({ ...formData, role: "student" })}
              className={`px-2 py-1 rounded-md border-2 cursor-pointer ${formData.role === "student" ? "bg-gray-300 text-black" : "hover:bg-gray-300"}`}
            >
              Student
            </span>
            <span onClick={() => setFormData({ ...formData, role: "teacher" })}
              className={`px-2 py-1 rounded-md border-2 cursor-pointer ${formData.role === "teacher" ? "bg-gray-300 text-black" : "hover:bg-gray-300"}`}>
              Teacher
            </span>
          </div>

          <div>
            already have an account
            <span className='cursor-pointer p-2 text-blue-400' onClick={() => navigate("/login")}>Login</span>
          </div>
          <button onClick={handleSubmit} className='w-[80%] bg-gray-700 text-white m-8 px-5 cursor-pointer rounded-md hover:bg-black p-2'>{loading ? <CircularProgress size={22} /> : "Signup"}</button>
        </div>

        {/* Right Side div */}
        <div className=' w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
          <img src={logo} alt="logo" className="w-30px shadow-2xl"></img>
        </div>
      </form >

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </div >
  )
}

export default Signup
