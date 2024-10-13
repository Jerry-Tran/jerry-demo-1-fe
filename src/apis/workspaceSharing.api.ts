import { instance as axiosClient } from '@/config'
export const workspaceSharingApi = {
  confirm: async (inviteId: string) => {
    const response = await axiosClient.post('sharing-workspace/confirm-invitation', { inviteId })
    return response.data
  }
}
