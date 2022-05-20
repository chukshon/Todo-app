import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { userInputValidation } from '../middleware/InputValidation.js'
const router = express.Router()

router.post('/register', userInputValidation, register)
router.post('login', userInputValidation, login)

export default router
