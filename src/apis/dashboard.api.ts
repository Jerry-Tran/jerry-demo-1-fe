import { instance as axiosClient } from '@/config'

export const dashboardApi = {
  getStatisticUsersRegistered: async () => {
    return await axiosClient.get('/dashboard/user-registrations')
  },
  getStatisticAccountsOfUsers: async () => {
    return await axiosClient.get('/dashboard/accounts-of-users')
  }
}
