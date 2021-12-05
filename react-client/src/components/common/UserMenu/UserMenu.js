import React from 'react'
import style from './UserMenu.module.scss'

const UserMenu = () => {
  return (
    <nav className="navigation">
      <div className={style.drop_down}>
        <button>
          Amit Azoulay <i className={style.arrow} />
        </button>
        <ul>
          <li>logout</li>
          <li>My Pod-Space</li>
        </ul>
      </div>
    </nav>
  )
}

export default UserMenu
