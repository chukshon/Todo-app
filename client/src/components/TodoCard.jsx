import React from 'react'
import { useState, useRef } from 'react'
const TodoCard = () => {
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(false)
  const input = useRef(null)
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <div className={`todo`}>
      <input type='checkbox' checked={true} onChange={handleChange} />
      <input
        type='text'
        // ref={input}
        value={content}
        // readOnly={!editing}
        onChange={handleChange}
      />

      <div className='todo__controls'>
        {!editing ? (
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        ) : (
          <>
            <button>Cancel</button>
            <button>Save</button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoCard
