import React from 'react'
import style from './SiteLogo.module.scss'
import logo from '../../../images/site_logo_main.png'

const SiteLogo = () => {
  return (
    <div>
      <img src={logo} className={style.site_logo} alt={'site logo'} />
    </div>
  )
}

export default SiteLogo
