import { LOGIN_USER, REGISTER_USER_BEGIN } from './actions'

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return 'hey'
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer
