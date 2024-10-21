/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { userService } from '@/services'

import { UserInfo } from '@/interfaces'

type UserState = {
  listUsers: UserInfo[]
  totalItems: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  message: string
}

const initialState: UserState = {
  listUsers: [],
  totalItems: 10,
  status: 'idle',
  error: null,
  message: ''
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userService.getUsers.fulfilled, (state, action) => {
        state.listUsers = action.payload.listUsers
        state.totalItems = action.payload.totalItems
      })
      .addCase(userService.deactivateUser.fulfilled, (state, action) => {
        const deactivatedUser = state.listUsers.find((user) => user.id === action.meta.arg)
        if (deactivatedUser) {
          deactivatedUser.deleted = action.payload
          state.listUsers = state.listUsers.map((user) => (user.id === deactivatedUser.id ? deactivatedUser : user))
        }
      })
      .addCase(userService.deactivateUser.rejected, (state, action: PayloadAction<any>) => {
        state.message = action.payload.message
        state.error = action.payload.errorCode
      })
      .addCase(userService.activeUser.fulfilled, (state, action) => {
        const activeUser = state.listUsers.find((user) => user.id === action.meta.arg)
        if (activeUser) {
          activeUser.deleted = ''
          state.listUsers = state.listUsers.map((user) => (user.id === activeUser.id ? activeUser : user))
        }
      })
  }
})

const userReducer = userSlice.reducer
export { userReducer }
