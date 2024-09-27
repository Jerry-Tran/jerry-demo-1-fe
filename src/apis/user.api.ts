import { instance as axiosClient } from '@/config'

import { IPaginationParams } from '@/interfaces'

export const userApi = {
  getUsers: async (query: IPaginationParams) => {
    return await axiosClient.get('/users', {
      params: query
    })
  }
}
