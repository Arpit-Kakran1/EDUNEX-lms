import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverURl } from '../utils/ServerUrl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners'

const ForgetPasssword = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    try {
      if (!formData.email) {
        toast.error("Please Enter the email");
      }

      const res = await axios.post(`${serverURl}/api/auth/sendOtp`, formData, { withCredentials: true })

      toast.success(res.data.message);
      setStep(2);
      setEmail(formData.email);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const VerfiyOtp = async () => {
    setLoading(true)
    try {
      if (!formData.otp) {
        toast.error("Please Enter the otp");
      }
      console.log(formData.otp);
      const res = await axios.post(`${serverURl}/api/auth/verifyOtp`,
        { email, otp: formData.otp }, { withCredentials: true });
      console.log(res);
      toast.success(res.data.message);
      setStep(3);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  const resetPassword = async () => {
    try {
      setLoading(true)
      if (formData.password != formData.confirmPassword) {
        setLoading(false)
        return toast.error("Please enter correct password");
      }

      const res = axios.post(`${serverURl}/api/auth/resetPassword`, { email, password: formData.confirmPassword });

      toast.success("Password reset successfull");
      navigate("/login")
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen  flex items-center justify-center bg-gray-100 px-4'>
      {/* Step 1 */}
      {step == 1 &&
        <div className='w-full bg-white shadow-md rounded-xl p-8 max-w-md'>
          <h1 className='text-center font-bold mb-6'>Forget Your Password?</h1>
          <form className='space-y-4'>
            <div className='flex gap-3 flex-col'>
              <lablel className="block text-sm font-medium text-gray-700">Enter your email addresss</lablel>
              <input type="email"
                placeholder='your@email'
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='border border-black rounded-sm'
              />
            </div>

          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer' disabled={loading} onClick={() => sendOtp()}>
              {loading ? <ClipLoader color="white" size={30} /> : "Send Otp"}
            </span>
            <button className='cursor-pointer' onClick={() => navigate("/login")}>Back to login</button>
          </div>
        </div>}
      {/* Step 2 */}
      {step == 2 &&
        <div className='w-full bg-white shadow-md rounded-xl p-8 max-w-md'>
          <h1 className='text-center font-bold mb-6'>Enter OTP</h1>
          <form className='space-y-4'>
            <div className='flex gap-3 flex-col'>
              <lablel className="block text-sm font-medium text-gray-700 ">Please enter the 4 digit otp send to your email</lablel>
              <input type="text"
                placeholder='****'
                name='otp'
                value={formData.otp}
                onChange={handleChange}
                className='border border-black rounded-sm p-1'
              />
            </div>
          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer' onClick={() => VerfiyOtp()}>
              {loading ? <ClipLoader color="white" size={30} /> : "Verify Otp"}
            </span>
            <button className='cursor-pointer' onClick={() => navigate("/login")}>Back to login</button>
          </div>
        </div>}
      {/* Step 3 */}
      {step == 3 &&
        <div className='w-full bg-white shadow-md rounded-xl p-8 max-w-md'>
          <h1 className='text-center font-bold mb-4 '>Reset Your Password</h1>
          <p className='text-gray-500 text-center mb-2'>Enter new password for your account</p>

          <form className='space-y-4'>
            <div className='flex gap-3 flex-col'>
              <lablel className="block text-sm font-medium text-gray-700">New Password</lablel>
              <input type="password"
                placeholder='********'
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='border border-black rounded-sm px-2'
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <lablel className="block text-sm font-medium text-gray-700">Confirm your password</lablel>
              <input type="password"
                placeholder='********'
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className='border border-black rounded-sm px-2'
              />
            </div>

          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer' onClick={() => resetPassword()}>
              {loading ? <ClipLoader color="white" size={30} /> : "Reset Password"}
            </span>
            <button className='cursor-pointer' onClick={() => navigate("/login")}>Back to login</button>
          </div>
        </div>}
    </div>
  )
}

export default ForgetPasssword
