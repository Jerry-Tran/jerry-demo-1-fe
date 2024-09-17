import { instance as axiosClient } from '@/config'

type userData = {
  name?: string
  email: string
  password: string
}

export const apiRegister = async (userData: userData) => {
  const response = await axiosClient.post('/auth/register', userData)
  return response
}

export const apiLogin = async (userData: userData) => {
  const response = await axiosClient.post('/auth/login', userData)
  return response
}

export const apiConfirmEmail = async (id: string) => {
  const response = await axiosClient.post('auth/confirm', { id })
  return response
}

export const apiLogout = async () => {
  const response = await axiosClient.post('/auth/logout')
  return response
}

export const apiForgotPassword = async (email: string) => {
  const response = await axiosClient.post('/auth/forgot-password', { email })
  return response
}

export const apiVerifyOtp = async (data) => {
  const response = await axiosClient.post('/auth/verify-otp', data)
  return response
}

export const apiResetPassword = async (data) => {
  const response = await axiosClient.post('/auth/reset-password', data)
  return response
}
