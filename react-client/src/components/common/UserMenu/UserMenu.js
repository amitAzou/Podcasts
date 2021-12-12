import React from 'react'
import style from './UserMenu.module.scss'
import {Link} from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className={style.drop_down}>
      <button>
        Amit Azoulay <i className={style.arrow} />
      </button>
      <div className={style.list}>
        <Link to="/login">
          <div className={style.item}>logout</div>
        </Link>
        <Link to="/podcast">
          <div className={style.item}>My Pod-Space</div>
        </Link>
      </div>
    </div>
  )
}

export default UserMenu
