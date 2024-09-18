import { createSlice } from '@reduxjs/toolkit'

import * as authService from '@/services'

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  status: 'idle',
  error: null,
  message: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false
      state.currentUser = null
    },
    resetMessage: (state) => {
      state.message = ''
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authService.registerService.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(authService.registerService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.loginService.fulfilled, (state, action) => {
        const { message, currentUser } = action.payload
        state.isLoggedIn = true
        state.message = message
        state.currentUser = currentUser
      })
      .addCase(authService.loginService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.confirmEmailService.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(authService.confirmEmailService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.logoutService.fulfilled, (state) => {
        state.currentUser = null
        state.isLoggedIn = false
      })
      .addCase(authService.forgotPasswordService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.verifyOtpService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.resetPasswordService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
  }
})

const { logout, resetMessage } = authSlice.actions
const authReducer = authSlice.reducer
export { logout, resetMessage, authReducer }
