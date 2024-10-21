/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { userApi } from '@/apis'

import { ICurrentUser, IPaginationParams } from '@/interfaces'

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
  }),
  updateProfile: createAsyncThunk(
    'user/update-profile',
    async (profileData: Omit<ICurrentUser, 'id' | 'role' | 'email'>, { rejectWithValue }) => {
      try {
        const response = await userApi.updateProfile(profileData)
        return response.data
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message)
      }
    }
  ),
  deactivateUser: createAsyncThunk('user/deactivate-user', async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.deactivateUser(userId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),
  activeUser: createAsyncThunk('user/active-user', async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userApi.activeUser(userId)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
