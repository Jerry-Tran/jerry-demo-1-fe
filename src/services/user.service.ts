/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { userApi } from '@/apis'

import { IPaginationParams } from '@/interfaces'

export const userService = {
  getUsers: createAsyncThunk('user/get-users', async (query: IPaginationParams, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(query)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),
  getCurrentUser: createAsyncThunk('user/get-current-user', async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getCurrentUser()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
