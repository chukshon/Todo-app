import Joi from 'joi'
import asyncHandler from 'express-async-handler'

const userSchema = Joi.object({
  name: Joi.string().required().messages({ name: 'should be a string' }),
  email: Joi.string().messages({ name: 'should be a string' }),
  password: Joi.string().messages({ name: 'should be a string' }),
  confirmPassword: Joi.string().messages({ name: 'should be a string' }),
})

export const userInputValidation = asyncHandler(async (req, res, next) => {
  await userSchema.validateAsync(req.body, { abortEarly: false })
  next()
})
