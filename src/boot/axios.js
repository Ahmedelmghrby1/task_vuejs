// import { boot } from 'quasar/wrappers'
// import axios from 'axios'

// const api = axios.create({ baseURL: 'http://localhost:3000/api' })

// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// export default boot(({ app }) => {
//   app.config.globalProperties.$axios = axios
//   app.config.globalProperties.$api = api
// })

// export { api }


import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { api }
