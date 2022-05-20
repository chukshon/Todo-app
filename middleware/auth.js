import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

const auth = async (req, res, next) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication Invalid' })
    return
  }
  const token = authHeaders.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = { userId: payload.userId }
    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication Invalid' })
    return
  }
}

export default auth
