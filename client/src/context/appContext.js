import React, { useContext, useReducer, useEffect } from 'react'

import { LOGIN_USER, REGISTER_USER_BEGIN } from './actions'
import reducer from './reducer'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const registerUser = async (currentUser) => {
    console.log(currentUser)
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
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
