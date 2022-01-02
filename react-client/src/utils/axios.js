import axios from 'axios'

axios.interceptors.request.use(
  (req) => {
    req.headers.Authorization = localStorage.getItem('token')
    return req
  },
  (err) => {
    console.error(err)
    return Promise.reject(err)
  }
)

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      console.error(error)
      window.location.href = '/podcast'
    } else {
      console.error(error.response.status)
      return Promise.reject(error)
    }
  }
)
