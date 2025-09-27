import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string) || '',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Example request/response interceptors
api.interceptors.request.use((config) => {
  // Add auth header here if needed
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // centralize error handling
    return Promise.reject(error)
  }
)

export default api
