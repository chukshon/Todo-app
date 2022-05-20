import express from 'express'
const router = express.Router()

router.post('/createTodo')
router.get('/')
router.put('/CompleteTodo/:id')
router.put('/inCompleteTodo/:id')
router.put('updateTodo/:id')
router.delete('/deleteTodo/:id')

export default router
