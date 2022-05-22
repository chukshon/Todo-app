import express from 'express'
import {
  completeTodo,
  createTodo,
  deleteTodo,
  getTodo,
  inCompleteTodo,
  updateTodo,
} from '../controllers/todos.controller.js'
import auth from '../middleware/auth.js'
import { todoValidation } from '../middleware/InputValidation.js'

const router = express.Router()

router.post('/createTodo', todoValidation, auth, createTodo)
router.get('/', getTodo)
router.patch('/CompleteTodo/:id', auth, completeTodo)
router.patch('/inCompleteTodo/:id', auth, inCompleteTodo)
router.patch('/updateTodo/:id', auth, updateTodo)
router.delete('/deleteTodo/:id', auth, deleteTodo)

export default router
