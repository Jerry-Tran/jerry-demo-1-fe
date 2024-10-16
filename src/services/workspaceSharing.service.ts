/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit'

import { workspaceSharingApi } from '@/apis'

export const workspaceSharingService = {
  confirmInvitationToWorkspace: createAsyncThunk(
    'workspace-sharing/confirm-invite',
    async (inviteId: string, { rejectWithValue }) => {
      try {
        const response = await workspaceSharingApi.confirm(inviteId)
        return response.data
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message)
      }
    }
  )
}
