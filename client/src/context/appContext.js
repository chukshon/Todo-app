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
  SET_COMPLETE_TODO,
  SET_INCOMPLETE_TODO,
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

  useEffect(() => {
    getIncompleteTodo()
    getCompleteTodo()
  }, [])
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

  const getCompleteTodo = async () => {
    try {
      const response = await authFetch.get('/todos')
      dispatch({
        type: GET_COMPLETE_TODOS,
        payload: response.data.completeTodo,
      })
    } catch (err) {}
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updatedTodo = async (id, todo) => {
    try {
      await authFetch.patch(`/todos/updateTodo/${id}`, {
        todoContent: todo,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deletedTodo = async (id, todo) => {
    try {
      await authFetch.delete(`/todos/deleteTodo/${id}`)
      if (todo.complete) {
        dispatch({ type: SET_COMPLETE_TODO, payload: id })
      } else {
        dispatch({ type: SET_INCOMPLETE_TODO, payload: id })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const updateTodoStatus = async (id, todo) => {
    try {
      if (todo.complete) {
        await authFetch.patch(`/todos/inCompleteTodo/${id}`)
        dispatch({ type: SET_COMPLETE_TODO, payload: id })
        getIncompleteTodo()
        getCompleteTodo()
      } else {
        await authFetch.patch(`/todos/CompleteTodo/${id}`)
        dispatch({ type: SET_INCOMPLETE_TODO, payload: id })
        getIncompleteTodo()
        getCompleteTodo()
      }
    } catch (err) {
      console.log(err)
    }
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
        getCompleteTodo,
        updatedTodo,
        deletedTodo,
        updateTodoStatus,
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
