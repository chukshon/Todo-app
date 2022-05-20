import express from 'express'
import { getUser, login, register } from '../controllers/auth.controller.js'
import auth from '../middleware/auth.js'
import {
  userRegisterValidation,
  userLoginValidation,
} from '../middleware/InputValidation.js'

const router = express.Router()

router.post('/register', userRegisterValidation, register)
router.post('/login', userLoginValidation, login)

export default router
