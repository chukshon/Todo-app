import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
const Header = () => {
  const { user, logoutUser } = useAppContext()
  const { pathname } = useLocation()
  return (
    <div className='main-header'>
      <div className='main-header__inner'>
        <div className='main-header__left'>
          <Link to='/'>ToDo List</Link>
        </div>

        <div className='main-header__right'>
          {user ? (
            <button className='btn' onClick={logoutUser}>
              Logout
            </button>
          ) : pathname === '/register' ? (
            <Link to='/login' className='btn'>
              Login
            </Link>
          ) : (
            <Link to='/register' className='btn'>
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
export default Header
