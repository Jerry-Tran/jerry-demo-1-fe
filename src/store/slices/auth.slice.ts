import { createSlice } from '@reduxjs/toolkit'

import { registerService, confirmEmailService, loginService, logoutService, forgotPasswordService } from '@/services'

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
      .addCase(registerService.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(registerService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(loginService.fulfilled, (state, action) => {
        const { message, currentUser } = action.payload
        state.isLoggedIn = true
        state.message = message
        state.currentUser = currentUser
      })
      .addCase(loginService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(confirmEmailService.fulfilled, (state, action) => {
        const { message } = action.payload
        state.message = message
      })
      .addCase(confirmEmailService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
      .addCase(logoutService.fulfilled, (state) => {
        state.currentUser = null
        state.isLoggedIn = false
      })
      .addCase(forgotPasswordService.rejected, (state, action) => {
        const { message, errorCode } = action.payload.response.data
        state.error = errorCode
        state.message = message
      })
  }
})

const { logout, resetMessage } = authSlice.actions
const authReducer = authSlice.reducer
export { logout, resetMessage, authReducer }
