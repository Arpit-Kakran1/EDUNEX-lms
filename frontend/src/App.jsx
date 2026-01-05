import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import useCurrentUser from './hooks/useCurrentUser'
import Profile from './pages/Profile'
import MyCourses from './pages/MyCourses'
import ForgetPasssword from './pages/ForgetPasssword'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const App = () => {
  useCurrentUser();
  const { user } = useSelector(state => state.user);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={user ? <Profile /> : <Navigate to={"/signup"} />}></Route>
        <Route path="/mycourses" element={<MyCourses />}></Route>
        <Route path="/mycourses" element={<MyCourses />}></Route>
        <Route path="/forgetpassword" element={<ForgetPasssword />}></Route>

      </Routes>
    </>
  )
}

export default App
