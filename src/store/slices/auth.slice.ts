/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authService, userService } from '@/services'

import { ICurrentUser } from '@/interfaces'

type AuthState = {
  isLoggedIn: boolean
  currentUser: null | ICurrentUser
  status: string
  error: string | null
  message: string
}

const initialState: AuthState = {
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
      .addCase(authService.register.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(authService.register.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.login.fulfilled, (state, action) => {
        const { message, currentUser } = action.payload
        state.isLoggedIn = true
        state.message = message
        state.currentUser = currentUser
      })
      .addCase(authService.login.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.confirmEmail.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(authService.confirmEmail.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.logout.fulfilled, (state) => {
        state.currentUser = null
        state.isLoggedIn = false
      })
      .addCase(authService.forgotPassword.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.verifyOtp.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.resetPassword.rejected, (state, action: PayloadAction<any>) => {
        const { message, errorCode } = action.payload
        state.error = errorCode
        state.message = message
      })
      .addCase(authService.changePassword.fulfilled, (state, action) => {
        state.message = action.payload.message
        state.error = null
      })
      .addCase(authService.changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload.errorCode
        state.message = action.payload.message
      })
      .addCase(userService.getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
      .addCase(userService.getCurrentUser.rejected, (state) => {
        state.currentUser = null
      })
      .addCase(userService.updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload
      })
  }
})

const { logout, resetMessage } = authSlice.actions
const authReducer = authSlice.reducer
export { logout, resetMessage, authReducer }
