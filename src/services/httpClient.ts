import axios from 'axios'
import { BASE_URL } from '../constants/config'

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(error),
)
