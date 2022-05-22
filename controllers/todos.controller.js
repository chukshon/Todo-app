import Todo from '../models/Todo.js'
import asyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import checkPermission from '../utils.js'

const createTodo = asyncHandler(async (req, res) => {
  req.body.user = req.user.userId
  const data = await Todo.create(req.body)
  res.status(StatusCodes.CREATED).json({ data })
  return
})

const getTodo = asyncHandler(async (req, res) => {
  const inCompleteTodo = await Todo.find({
    user: req.user.userId,
    complete: false,
  }).sort({ createdAt: -1 })

  const completeTodo = await Todo.find({
    user: req.user.userId,
    complete: true,
  }).sort({ completedAt: -1 })

  res.status(StatusCodes.OK).json({ inCompleteTodo, completeTodo })
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

  checkPermission(req.user, todo.user)

  if (!checkPermission) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Not authorized to access this route' })
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
  checkPermission(req.user, todo.user)

  if (!checkPermission) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'Not authorized to access this route' })
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
  return
})
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    user: req.user.userId,
    _id: req.params.id,
  })

  if (!todo) {
    res.status(404).json({ msg: 'Could Not Find ToDo' })
    return
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    {
      user: req.user.userId,
      _id: req.params.id,
    },
    {
      todoContent: req.body.todoContent,
    },
    {
      new: true,
    }
  )

  res.status(StatusCodes.OK).json({ updatedTodo })
  return
})
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({
    user: req.user.userId,
    _id: req.params.id,
  })

  if (!todo) {
    res.status(404).json({ msg: 'Could Not Find ToDo' })
    return
  }

  await Todo.findByIdAndRemove({
    user: req.user.userId,
    _id: req.params.id,
  })

  res.status(StatusCodes.OK).json({ msg: 'Deleted Successfully' })
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
