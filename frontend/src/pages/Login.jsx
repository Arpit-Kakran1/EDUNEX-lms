import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { serverURl } from '../utils/ServerUrl';
import { IoEye, IoEyeOff } from 'react-icons/io5';
const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [showPassword, setShowPassword] = useState(false)

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("Success")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    try {
      if (!formData.email || !formData.password)
        return setMessage("All fields are required");

      e.preventDefault();

      const res = await axios.post(`${serverURl}/api/auth/login`, formData, { withCredential: true });
      console.log(res);

      setFormData({
        email: "",
        password: "",
      })
      setMessage(res.data.message || "Login Success");
      setOpen(true);
      setSeverity("success")
    } catch (error) {
      console.log(error)
      setMessage(error?.response?.data?.message || "Login failed!");
      setOpen(true);
      setSeverity("error")
    }
  }


  return (
    <div>
      <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center'>
        <form className='w-[90%] md:w-200 h-150 bg-[white] shadow-2xl rounded-2xl flex'>
          {/* Left Side div */}
          <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center'>

            <div className='p-10'>
              <h1 className='text-2xl font-semibold text-black'>Let's get Started</h1>
              <h2 className='text-xl text-gray-400'>Login your Account</h2>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2 justify-start m-2'>
                <label className='text-black text-md'>Email</label>
                <input type="email" placeholder='enter @email' className='bg-gray-100 rounded-md px-1 hover:bg-gray-300'
                  value={formData.email}
                  name='email'
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col gap-2 justify-start m-2'>
                <label className='text-black text-md'>Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder='enter password'
                    className='bg-gray-100 relative rounded-md px-1 hover:bg-gray-300'
                    value={formData.password}
                    id='password'
                    name='password'
                    onChange={handleChange}
                  >
                  </input>
                  <span className='absolute right-2 top-2 cursor-pointer text-gray-600 hover:text-black' onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IoEye /> : <IoEyeOff />}
                  </span>
                </div>
              </div>
            </div>

            <div className='m-5'>
              create new account
              <span className='cursor-pointer p-2 text-blue-400' onClick={() => navigate("/signup")}>Signup</span>
            </div>
            <button className='w-[80%] bg-gray-700 text-white m-8 px-5 cursor-pointer rounded-md hover:bg-black p-2'
              onClick={handleSubmit}
            >Login</button>


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
    </div>
  )
}

export default Login
