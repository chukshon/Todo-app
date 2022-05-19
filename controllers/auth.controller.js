import User from '../models/User.js'
import asyncHandler from 'express-async-handler'

const register = asyncHandler(async (req, res, next) => {
  const data = await User.create({ ...req.body })
  res.status(201).json({ data })
})

export { register }
