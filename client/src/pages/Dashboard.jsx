import React, { useEffect } from 'react'
import AddTodo from '../components/AddTodo'
import TodoCard from '../components/TodoCard'
import { useAppContext } from '../context/appContext'

const Dashboard = () => {
  const { getIncompleteTodo, inCompleteTodo, completeTodo, getCompleteTodo } =
    useAppContext()
  useEffect(() => {
    getIncompleteTodo()
    getCompleteTodo()
  }, [])
  return (
    <div className='dashboard'>
      <AddTodo />
      <div className='todos'>
        {inCompleteTodo.map((todo) => {
          // return <h1 key={todo.id}>{todo.todoContent}</h1>
          return <TodoCard key={todo._id} todo={todo} />
        })}
      </div>

      {completeTodo.length > 0 && (
        <div className='todos'>
          <h2 className='todos__title'>Complete ToDo's</h2>
          {completeTodo.map((todo) => {
            // return <h1 key={todo.id}>{todo.todoContent}</h1>
            return <TodoCard key={todo._id} todo={todo} />
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard
