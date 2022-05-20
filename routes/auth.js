import express from 'express'
import { getUser, login, register } from '../controllers/auth.controller.js'
import auth from '../middleware/auth.js'
import { userInputValidation } from '../middleware/InputValidation.js'

const router = express.Router()

router.post('/register', userInputValidation, register)
router.post('/login', login)

export default router
