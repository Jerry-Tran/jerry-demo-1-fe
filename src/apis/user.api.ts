import { instance as axiosClient } from '@/config'
export const userApi = {
  getUsers: async (page: number, limit: number) => {
    return await axiosClient.get('/users', {
      params: {
        page,
        limit
      }
    })
  }
}
