import React, {useState} from 'react'
import style from './LoginPage.module.scss'
import logo from '../../images/login_logo.png'
import CopyRight from '../../components/common/CopyRight/CopyRight'
import {getToken} from '../../services/podcasts'
import '../../utils/axios'
import {useNavigate} from 'react-router-dom'

const LoginPage = () => {
  const [credentials, setCredentials] = useState({})
  const [isLoginSuccess, setLoginSuccessStatus] = useState(false)
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
      const token = await getToken(credentials)
      localStorage.setItem('token', token)
      localStorage.setItem('username', credentials.username)
      navigate(localStorage.getItem('lastPage'))
    } catch (err) {
      setLoginSuccessStatus(true)
      console.error(err)
    }
  }

  const handleEnter = async (event) => {
    if (event.key === 'Enter') {
      await submitLogin()
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
              onKeyDown={handleEnter}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
            />
          </div>

          <div className={style.input_placeHolder}>
            <input
              onKeyDown={handleEnter}
              onChange={handleChange}
              name="password"
              className={style.login_input}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className={style.sign_up}>
            <button className={style.submit} onClick={submitLogin}>
              Log In
            </button>
            {isLoginSuccess && (
              <div className={style.errMsg}>username or password incorrect</div>
            )}
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
