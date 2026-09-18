import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/user.js"
import { JWT_SECRET, JWT_EXPIRES_IN } from "./env.js"

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  const token = generateToken(user._id)

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  }
}

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error("Invalid email or password")
  }

  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    throw new Error("Invalid email or password")
  }

  const token = generateToken(user._id)

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token
  }
}