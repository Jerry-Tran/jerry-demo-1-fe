import { createAsyncThunk } from '@reduxjs/toolkit'

import * as authApi from '@/apis'

export const registerService = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await authApi.apiRegister(userData)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const confirmEmailService = createAsyncThunk('auth/confirm-email', async (id, { rejectWithValue }) => {
  try {
    const response = await authApi.apiConfirmEmail(id)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const loginService = createAsyncThunk('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await authApi.apiLogin(loginData)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const logoutService = createAsyncThunk('/auth/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await authApi.apiLogout()
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const forgotPasswordService = createAsyncThunk('/auth/forgot-password', async (email, { rejectWithValue }) => {
  try {
    const response = await authApi.apiForgotPassword(email)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const verifyOtpService = createAsyncThunk('/auth/verify-otp', async (data, { rejectWithValue }) => {
  try {
    const response = await authApi.apiVerifyOtp(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const resetPasswordService = createAsyncThunk('/auth/reset-password', async (data, { rejectWithValue }) => {
  try {
    const response = await authApi.apiResetPassword(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error)
  }
})
