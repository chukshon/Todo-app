import User from '../models/User.js'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Email already in use' })
    return
  }
  if (confirmPassword !== password) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Password does not match' })
    return
  }
  const data = await User.create({ name, email, password })
  const token = data.createJWT()
  res.status(201).json({ user: { name: data.name, email: data.email }, token })
})

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Invalid Credentials' })
    return
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' })
    return
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
})

const getUser = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({ data: req.user.userId })
})

export { register, login, getUser }
