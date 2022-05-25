import React, { useEffect } from 'react'
import AddTodo from '../components/AddTodo'
import TodoCard from '../components/TodoCard'
import { useAppContext } from '../context/appContext'

const Dashboard = () => {
  const { getIncompleteTodo, inCompleteTodo } = useAppContext()

  useEffect(() => {
    getIncompleteTodo()
  }, [inCompleteTodo])

  return (
    <div className='dashboard'>
      <AddTodo />
      {/* <TodoCard /> */}
      {inCompleteTodo.map((todo) => {
        return <p key={todo._id}>{todo.todoContent}</p>
      })}
    </div>
  )
}

export default Dashboard
