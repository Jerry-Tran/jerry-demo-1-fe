import { createSlice } from '@reduxjs/toolkit'

import { dashboardService } from '@/services'

type ChartDataUsersRegistered = {
  years: number[]
  data: [{ month: string; year: number; value: number }]
}

type ChartDataAccountsOfUsers = {
  domain: string
  value: number
}

type DashboardDataState = {
  chartDataUsersRegistered: ChartDataUsersRegistered
  chartDataAccountsOfUsers: ChartDataAccountsOfUsers[]
  quantityUser: number
  quantityAccount: number
  quantityWorkspace: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  message: string
}

const initialState: DashboardDataState = {
  chartDataUsersRegistered: {
    years: [],
    data: [{ month: '', year: 2024, value: 0 }]
  },
  chartDataAccountsOfUsers: [],
  quantityUser: 0,
  quantityAccount: 0,
  quantityWorkspace: 0,
  status: 'idle',
  error: null,
  message: ''
}
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboardService.getStatisticUsersRegistered.fulfilled, (state, action) => {
      state.chartDataUsersRegistered = action.payload || []
    })
    builder.addCase(dashboardService.getStatisticAccountsOfUsers.fulfilled, (state, action) => {
      state.chartDataAccountsOfUsers = action.payload || []
    })
    builder.addCase(dashboardService.getQuantityUser.fulfilled, (state, action) => {
      state.quantityUser = action.payload
    })
    builder.addCase(dashboardService.getQuantityAccount.fulfilled, (state, action) => {
      state.quantityAccount = action.payload || []
    })
    builder.addCase(dashboardService.getQuantityWorkspace.fulfilled, (state, action) => {
      state.quantityWorkspace = action.payload || []
    })
  }
})

const dashboardReducer = dashboardSlice.reducer
export { dashboardReducer }
