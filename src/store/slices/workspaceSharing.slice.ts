import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit'

import { workspaceSharingService } from '@/services'

import { IErrorResponse } from '@/interfaces'

type WorkspaceSharingState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed' | number
  error: string | null
  message: string
}

const initialState: WorkspaceSharingState = {
  status: 'idle',
  error: null,
  message: ''
}

const workspaceSharingSlice = createSlice({
  name: 'workspace-sharing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(workspaceSharingService.confirmInvitationToWorkspace.rejected, (state, action) => {
      if (isRejectedWithValue(action)) {
        const { errorCode, message, status } = action.payload as IErrorResponse
        state.error = errorCode
        state.message = message
        state.status = status
      } else {
        state.error = 'Unknown error'
        state.message = 'Something went wrong'
        state.status = 'failed'
      }
    })
  }
})

const workspaceSharingReducer = workspaceSharingSlice.reducer
export { workspaceSharingReducer }
