import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Email already in use' })
  }
  if (confirmPassword !== password) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Password does not match' })
  }
  const data = await User.create({ name, email, password })
  const token = data.createJWT()

  res.status(201).json({ user: { name: data.name, email: data.email }, token })
})

export { register }
