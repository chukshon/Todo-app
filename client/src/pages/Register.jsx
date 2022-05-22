import React from 'react'
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}
const Register = () => {
  const [values, setValues] = useState(initialState)
  const { user, registerUser, isLoading } = useAppContext()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = values
    const currentUser = { name, email, password, confirmPassword }
    console.log(currentUser)
    registerUser(currentUser)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name' className='form-label'>
        Name
      </label>
      <input
        type='text'
        value={values.name}
        name='name'
        onChange={handleChange}
        className='form-input'
      />
      <label htmlFor='email' className='form-label'>
        Email
      </label>
      <input
        type='email'
        value={values.email}
        name='email'
        onChange={handleChange}
        className='form-input'
      />
      <label htmlFor='email' className='form-label'>
        password
      </label>
      <input
        type='password'
        value={values.password}
        name='password'
        onChange={handleChange}
        className='form-input'
      />
      <label htmlFor='email' className='form-label'>
        Confirm Password
      </label>
      <input
        type='password'
        value={values.confirmPassword}
        name='confirmPassword'
        onChange={handleChange}
        className='form-input'
      />
      <button type='submit' className='btn btn-block' disabled={isLoading}>
        submit
      </button>
    </form>
  )
}

export default Register
