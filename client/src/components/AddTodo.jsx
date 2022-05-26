import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../context/appContext'

const AddTodo = () => {
  const { createTodo, getIncompleteTodo } = useAppContext()
  const [todoContent, setContent] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    createTodo(todoContent)
    getIncompleteTodo()
    setContent('')
  }
  return (
    <div>
      <form className='new' onSubmit={handleSubmit}>
        <input
          type='text'
          value={todoContent}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className='btn'
          type='submit'
          disabled={todoContent.length === 0}
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddTodo
