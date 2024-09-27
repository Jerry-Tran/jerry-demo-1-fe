/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { userApi } from '@/apis/user.api'

type Paginate = {
  page: number
  limit: number
}
export const userService = {
  getUsers: createAsyncThunk('auth/register', async ({ page, limit }: Paginate, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(page, limit)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
