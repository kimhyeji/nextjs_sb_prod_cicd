import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.hj-yee.shop/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default api
