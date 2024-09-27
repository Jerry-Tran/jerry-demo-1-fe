/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { userApi } from '@/apis'

import { IPaginationParams } from '@/interfaces'

export const userService = {
  getUsers: createAsyncThunk('auth/register', async (query: IPaginationParams, { rejectWithValue }) => {
    try {
      const response = await userApi.getUsers(query)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
