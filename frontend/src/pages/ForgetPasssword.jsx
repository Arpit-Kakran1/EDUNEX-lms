import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const ForgetPasssword = () => {
  const [step, setStep] = useState(3);
  const navigate = useNavigate();
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
                className='border border-black rounded-sm'
              />
            </div>

          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer'>
              Send Otp
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
              <lablel className="block text-sm font-medium text-gray-700">Please enter the 4 digit otp send to your email</lablel>
              <input type="email"
                placeholder='Enter here'
                className='border border-black rounded-sm'
              />
            </div>

          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer'>
              Verfiy Otp
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
              <input type="email"
                placeholder='Enter new password'
                className='border border-black rounded-sm px-2'
              />
            </div>
            <div className='flex gap-3 flex-col'>
              <lablel className="block text-sm font-medium text-gray-700">Confirm your password</lablel>
              <input type="email"
                placeholder='Confirm your password'
                className='border border-black rounded-sm px-2'
              />
            </div>

          </form>
          <div className='flex flex-col items-center gap-4 my-5'>
            <span className='bg-black text-white px-2 py-1 w-full text-center rounded-md cursor-pointer'>
              Send Otp
            </span>
            <button className='cursor-pointer' onClick={() => navigate("/login")}>Back to login</button>
          </div>
        </div>}
    </div>
  )
}

export default ForgetPasssword
