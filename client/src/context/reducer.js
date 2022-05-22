import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CREATE_TODO_BEGIN,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  GET_INCOMPLETE_TODOS,
  GET_COMPLETE_TODOS,
  LOGOUT_USER,
} from './actions'

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      user: action.payload.user,
      token: action.payload.token,
    }
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      user: action.payload.user,
      token: action.payload.token,
    }
  }
  if (action.type === LOGOUT_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === CREATE_TODO_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === CREATE_TODO_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === CREATE_TODO_ERROR) {
    return {
      ...state,
      isLoading: false,
    }
  }
  if (action.type === GET_INCOMPLETE_TODOS) {
    return {
      ...state,
      inCompleteTodo: action.payload,
    }
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null,
      isLoading: false,
    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
