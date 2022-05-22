import React, { useContext, useReducer, useEffect } from 'react'

import {
  LOGIN_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  CREATE_TODO_BEGIN,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  GET_INCOMPLETE_TODOS,
  GET_COMPLETE_TODOS,
  LOGOUT_USER,
} from './actions'
import reducer from './reducer'
import axios from 'axios'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  todoContent: '',
  inCompleteTodo: [],
  completeTodo: [],
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/register', currentUser)
      const { user, token } = response.data
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
      console.log(response.data)
      addUserToLocalStorage({ user, token })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
  }

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const response = await axios.post('/api/v1/auth/login', currentUser)
      const { user, token } = response.data
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
      console.log(response.data)
      addUserToLocalStorage({ user, token })
    } catch (err) {
      console.log(err.response.data.msg)
      dispatch({
        type: LOGOUT_USER_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
  }

  const createTodo = async (todoContent) => {
    dispatch({ type: CREATE_TODO_BEGIN })
    try {
      const response = await authFetch.post('/todos/createTodo', {
        todoContent,
      })
      dispatch({ type: CREATE_TODO_SUCCESS })
    } catch (err) {
      dispatch({
        type: CREATE_TODO_ERROR,
        payload: { msg: err.response.data.msg },
      })
    }
  }

  const getIncompleteTodo = async () => {
    try {
      const response = await authFetch.get('/todos')
      dispatch({
        type: GET_INCOMPLETE_TODOS,
        payload: response.data.inCompleteTodo,
      })
    } catch (err) {}
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logoutUser,
        createTodo,
        getIncompleteTodo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
