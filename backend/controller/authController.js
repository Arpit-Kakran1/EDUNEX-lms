import express from 'express';
import User from '../model/userModel.js';
import validator from 'validator';
import genToken from '../config/token.js';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';

export const signUp = async (req,res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({
        message: "Missing mandotry fields",
        success:false
      })
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(200).json({
        message: "User already exists",
        success:false
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message:"Please enter a valid email"
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:"Enter strong password"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password:hashedPassword,
      email,
      role 
    })

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge:7*24*60*60*1000
    })

    return res.status(201).json({
    message:"User created succesfully"
    })

  } catch (error) {
    return res.status(500).json({
      message:`Signup error ${error}`
    })
  }
}

export const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message:"Email or password missing"
    })
  }

  const user =await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success:false
    })
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message:"Password is incorect"
    })
  }

  const token = await genToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
path:"/",
    maxAge:7*24*60*60*1000
  })

    return res.status(201).json({
      message: "Login succesfull",
      user: {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
  }
  
  catch (error) {
    return res.status(500).json({
      message:`Login error ${error}`
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
        httpOnly: true,
    secure: false,
    sameSite: "lax",
path:"/",
     });
    return res.status(200).json({
      message:"Logout succesfully"
    })

  }
  catch (error) {
    return res.status(500).json({
      message:`Logout error ${error}`
    })
  }
}