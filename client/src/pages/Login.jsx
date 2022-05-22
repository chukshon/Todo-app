import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
const initialState = {
  email: '',
  password: '',
}
const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, loginUser, isLoading } = useAppContext()
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values
    const currentUser = { email, password }
    console.log(currentUser)
    loginUser(currentUser)
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
    }
  }, [user, navigate])
  return (
    <div className='auth'>
      <div className='auth__box'>
        <div className='auth__header'>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='auth__field'>
            <label htmlFor='email' className='auth__field'>
              Email
            </label>
            <input
              type='email'
              value={values.email}
              name='email'
              onChange={handleChange}
              className='form-input'
            />
          </div>

          <div className='auth__field'>
            <label htmlFor='email' className='auth__field'>
              password
            </label>
            <input
              type='password'
              value={values.password}
              name='password'
              onChange={handleChange}
              className='form-input'
            />
          </div>
          <div className='auth__footer'>
            <button type='submit' className='btn' disabled={isLoading}>
              Login
            </button>
            <div className='auth__register'>
              <p>
                Not a member? <Link to='/register'>Register now</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
