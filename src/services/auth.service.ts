/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { authApi } from '@/apis'

import { ILoginData, IRegisterData, IResetPasswordData, IVerifyOTP } from '@/interfaces'

export const authService = {
  register: createAsyncThunk('auth/register', async (userData: IRegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  confirmEmail: createAsyncThunk('auth/confirm-email', async (id: string, { rejectWithValue }) => {
    try {
      const response = await authApi.confirmEmail(id)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  login: createAsyncThunk('auth/login', async (loginData: ILoginData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(loginData)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  logout: createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.logout()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  forgotPassword: createAsyncThunk('auth/forgot-password', async (email: string, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(email)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  verifyOtp: createAsyncThunk('auth/verify-otp', async (data: IVerifyOTP, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyOtp(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),

  resetPassword: createAsyncThunk('auth/reset-password', async (data: IResetPasswordData, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
