import React from 'react'
import { useState } from 'react'

const AddTodo = () => {
  const [content, setContent] = useState('')
  const handleSubmit = () => {}
  return (
    <div>
      <form className='new' onSubmit={handleSubmit}>
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className='btn' type='submit' disabled={content.length === 0}>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddTodo
