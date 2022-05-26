import React from 'react'
import { useState, useRef } from 'react'
import { useAppContext } from '../context/appContext'

const TodoCard = ({ todo }) => {
  const { updatedTodo, deletedTodo, updateTodoStatus } = useAppContext()
  const [content, setContent] = useState(todo.todoContent)
  const [editing, setEditing] = useState(false)
  const input = useRef(null)
  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const onEditing = () => {
    setEditing(true)
  }

  const endEditing = () => {
    setEditing(false)
  }

  const deleteTodo = (id, todo) => {
    if (window.confirm('Are you sure you want to delete this ToDo?')) {
      deletedTodo(id, todo)
    }
  }

  const updateTodo = (id) => {
    updatedTodo(id, content)
    console.log(id)
    setEditing(false)
  }

  const markAsComplete = () => {
    updateTodoStatus(todo._id, todo)
  }

  const markAsIncomplete = () => {
    updateTodoStatus(todo._id, todo)
  }
  return (
    <div className={`todo`}>
      <input
        type='checkbox'
        checked={todo.complete}
        onChange={!todo.complete ? markAsComplete : markAsIncomplete}
      />

      <input
        type='text'
        ref={input}
        value={content}
        readOnly={!editing}
        onChange={handleChange}
      />
      <div className='todo__controls'>
        {!editing ? (
          <>
            <button onClick={onEditing}>Edit</button>
            <button onClick={() => deleteTodo(todo._id, todo)}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={endEditing}>Cancel</button>
            <button onClick={() => updateTodo(todo._id)}>Save</button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoCard
