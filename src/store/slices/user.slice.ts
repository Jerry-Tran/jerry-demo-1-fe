import { createSlice } from '@reduxjs/toolkit'

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
    builder.addCase(userService.getUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload.listUsers
      state.totalItems = action.payload.totalItems
    })
  }
})

const userReducer = userSlice.reducer
export { userReducer }
