import axios from 'axios'

axios.interceptors.request.use(
  (req) => {
    const token = window.token
    req.headers.Authorization = token
    return req
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (res) => res,
  () => {
    window.location.href = '/login'
  }
)
