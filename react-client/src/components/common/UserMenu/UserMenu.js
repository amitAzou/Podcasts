import React, {useEffect, useState} from 'react'
import style from './UserMenu.module.scss'
import {Link, useNavigate} from 'react-router-dom'

const UserMenu = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [logStatus, setLogStatus] = useState(false)

  const logout = () => {
    if (logStatus === true) {
      localStorage.clear()
      getUserName()
      navigate('/podcast')
      window.location.reload()
    } else {
      navigate('/admin')
    }
  }

  const getUserName = () => {
    const user = localStorage.getItem('username')
    if (!user) {
      setUsername('User Menu')
      setLogStatus(false)
    } else {
      setUsername(user, setUsername)
      setLogStatus(true)
    }
  }

  useEffect(() => {
    getUserName()
  }, [])

  return (
    <div className={style.drop_down}>
      <button>
        {username}
        <i className={style.arrow} />
      </button>
      <div className={style.list}>
        <div className={style.item} onClick={logout}>
          {logStatus ? 'Logout' : 'Login'}
        </div>
        <Link to="/podcast">
          <div className={style.item}>My Pod-Space</div>
        </Link>
      </div>
    </div>
  )
}

export default UserMenu
