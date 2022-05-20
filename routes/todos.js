import express from 'express'

const router = express.Router()

router.post('/createTodo')
router.get('/incompleteTodos')
router.get('/completeTodos')
router.put('/updateTodo')
router.put('/updateTodoStatus')
router.delete('/deleteTodo')

export default router
