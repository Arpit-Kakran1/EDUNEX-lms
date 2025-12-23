import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import Login from '../src/pages/Login'
import useCurrentUser from './hooks/useCurrentUser'

const App = () => {
  useCurrentUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  )
}

export default App
