import axios from 'axios'

const api = axios.create({
  baseURL: '/api',  // usa la ruta relativa que el proxy redirige a 8080
  timeout: 10000
})

export default api