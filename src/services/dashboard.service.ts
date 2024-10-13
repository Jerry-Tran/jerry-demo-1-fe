/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { dashboardApi } from '@/apis'

export const dashboardService = {
  getStatisticUsersRegistered: createAsyncThunk('dashboard/user-registrations', async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getStatisticUsersRegistered()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }),
  getStatisticAccountsOfUsers: createAsyncThunk('dashboard/accounts-of-users', async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getStatisticAccountsOfUsers()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message)
    }
  })
}
