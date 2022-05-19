import Joi from 'joi'
import asyncHandler from 'express-async-handler'

const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const PasswordError =
  'Password must be at least 8 character, include uppercase, lowercase, digit and special character.'

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().regex(PasswordRegex).message(PasswordError).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')),
})

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().regex(PasswordRegex).message(PasswordError).required(),
})

const todoSchema = Joi.object({})

export const userInputValidation = asyncHandler(async (req, res, next) => {
  await userSchema.validateAsync(req.body, { abortEarly: false })
  next()
})
