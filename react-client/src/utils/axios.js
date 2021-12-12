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
  (err) => {
    if (err === 401) {
      window.location.href = '/login'
    } else {
      return Promise.reject(err)
    }
  }
)
