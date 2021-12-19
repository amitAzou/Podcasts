import React from 'react'
import style from './UserMenu.module.scss'
import {Link, useNavigate} from 'react-router-dom'

const UserMenu = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const username = localStorage.getItem('username')
  return (
    <div className={style.drop_down}>
      <button>
        {username} <i className={style.arrow} />
      </button>
      <div className={style.list}>
        <div className={style.item} onClick={logout}>
          logout
        </div>
        <Link to="/podcast">
          <div className={style.item}>My Pod-Space</div>
        </Link>
      </div>
    </div>
  )
}

export default UserMenu
