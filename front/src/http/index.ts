import axios, { AxiosHeaders } from 'axios';
import { AuthResponse } from "../models/response/auth_response.type";

export const API_URL = "http://localhost:5000/api"

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers = {...config.headers} as AxiosHeaders
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  return config;
});

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalReq = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalReq._isRetry = true;
    try {
      const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', res.data.accessToken)
      return $api.request(originalReq)
    } catch (e) {
      console.log('NOT AUTHORIZED!\n' + e)
    }
  }
  throw error;
})


export default $api;