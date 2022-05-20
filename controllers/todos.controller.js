import Todo from '../models/Todo.js'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'

const createTodo = asyncHandler(async (req, res) => {
  req.body.user = req.user.userId
  const data = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ data })
  return
})

const getTodo = asyncHandler(async (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Gotten Todo' })
  return
})

const completeTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    user: req.user.userId,
    _id: req.params.id,
  })

  if (!todo) {
    res.status(404).json({ msg: 'Could Not Find ToDo' })
    return
  }

  if (todo.complete) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'ToDo is already complete' })
    return
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    {
      user: req.user.userId,
      _id: req.params.id,
    },
    {
      complete: true,
      completedAt: new Date(),
    },
    {
      new: true,
    }
  )
  res.status(StatusCodes.OK).json({ updatedTodo })
})

const inCompleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    user: req.user.userId,
    _id: req.params.id,
  })

  if (!todo) {
    res.status(404).json({ msg: 'Could Not Find ToDo' })
    return
  }

  if (!todo.complete) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'ToDo is already incomplete' })
    return
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    {
      user: req.user.userId,
      _id: req.params.id,
    },
    {
      complete: false,
      completedAt: null,
    },
    {
      new: true,
    }
  )
  res.status(StatusCodes.OK).json({ updatedTodo })
})
const updateTodo = asyncHandler(async (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).json({ msg: 'update Todo' })
  return
})
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).json({ msg: 'delete Todo' })
  return
})

export {
  createTodo,
  getTodo,
  completeTodo,
  inCompleteTodo,
  updateTodo,
  deleteTodo,
}
