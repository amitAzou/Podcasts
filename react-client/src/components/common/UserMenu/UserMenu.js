import React, {useEffect, useState} from 'react'
import style from './UserMenu.module.scss'
import {Link, useNavigate} from 'react-router-dom'

const UserMenu = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [logStatus, setLogStatus] = useState('')

  const logout = () => {
    if (logStatus === 'Logout') {
      localStorage.clear()
      getUserName()
      navigate('/podcast')
    } else {
      navigate('/admin')
    }
  }

  const getUserName = () => {
    const user = localStorage.getItem('username')
    if (!user) {
      setUsername('Menu')
      setLogStatus('Login')
    } else {
      setUsername(user, setUsername)
      setLogStatus('Logout')
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <div className={style.drop_down}>
      <button>
        {username} <i className={style.arrow} />
      </button>
      <div className={style.list}>
        <div className={style.item} onClick={logout}>
          {logStatus}
        </div>
        <Link to="/podcast">
          <div className={style.item}>My Pod-Space</div>
        </Link>
      </div>
    </div>
  )
}

export default UserMenu
