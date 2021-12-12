import React, {useState} from 'react'
import style from './LoginPage.module.scss'
import logo from '../../images/login_logo.png'
import CopyRight from '../../components/common/CopyRight/CopyRight'
import {getToken} from '../../services/podcasts'
import '../../utils/axios'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const {name, value} = event.target

    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  const submitLogin = async () => {
    try {
      window.token = await getToken(credentials)
      if (window.token === null) {
        navigate('/login')
      } else {
        navigate('/podcast')
      }
    } catch (err) {
      console.error(err)
      navigate('/login')
    }
  }

  return (
    <div className={style.login_body}>
      <div className={style.registration_box}>
        <div className={style.register}>
          <img src={logo} className={style.site_logo} alt={'site logo'} />

          <h2 className={style.title}>Log In</h2>

          <div className={style.input_placeHolder}>
            <input
              className={style.login_input}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className={style.input_placeHolder}>
            <input
              onChange={handleChange}
              name="password"
              className={style.login_input}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className={style.sign_up}>
            <button className={style.submit} onClick={submitLogin}>
              {' '}
              Log In
            </button>
          </div>
        </div>
      </div>
      <div className={style.bottom_row}>
        <CopyRight />
      </div>
    </div>
  )
}

export default LoginPage
