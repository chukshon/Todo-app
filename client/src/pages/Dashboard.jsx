import React, { useEffect } from 'react'
import AddTodo from '../components/AddTodo'
import { useAppContext } from '../context/appContext'
const Dashboard = () => {
  const { getIncompleteTodo, inCompleteTodo } = useAppContext()

  useEffect(() => {
    getIncompleteTodo()
  }, [inCompleteTodo])

  return (
    <div className='dashboard'>
      <AddTodo />
      {inCompleteTodo.map((todo) => {
        return <p key={todo._id}>{todo.todoContent}</p>
      })}
    </div>
  )
}

export default Dashboard
