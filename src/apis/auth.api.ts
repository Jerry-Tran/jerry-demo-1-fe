import { instance as axiosClient } from '@/config'
import { ChangePassWordData, ILoginData, IRegisterData, IResetPasswordData, IVerifyOTP } from '@/interfaces'

export const authApi = {
  register: async (userData: IRegisterData) => {
    return await axiosClient.post('/auth/register', userData)
  },

  login: async (userData: ILoginData) => {
    return await axiosClient.post('/auth/login', userData)
  },

  confirmEmail: async (id: string) => {
    return await axiosClient.post('auth/confirm', { id })
  },

  logout: async () => {
    return await axiosClient.post('/auth/logout')
  },

  forgotPassword: async (email: string) => {
    return await axiosClient.post('/auth/forgot-password', { email })
  },

  verifyOtp: async (data: IVerifyOTP) => {
    return await axiosClient.post('/auth/verify-otp', data)
  },

  resetPassword: async (data: IResetPasswordData) => {
    return await axiosClient.post('/auth/reset-password', data)
  },

  changePassword: async (changePassWordData: ChangePassWordData) => {
    return await axiosClient.patch('auth/change-password', changePassWordData)
  }
}
