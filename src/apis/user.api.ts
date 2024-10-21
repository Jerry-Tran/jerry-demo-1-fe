import { instance as axiosClient } from '@/config'

import { ICurrentUser, IPaginationParams } from '@/interfaces'

export const userApi = {
  getUsers: async (query: IPaginationParams) => {
    return await axiosClient.get('/users', {
      params: query
    })
  },
  getCurrentUser: async () => {
    return await axiosClient.get('/users/currentUser')
  },
  updateProfile: async (profileData: Omit<ICurrentUser, 'id' | 'role' | 'email'>) => {
    return await axiosClient.patch('users/update-profile', profileData)
  },
  deactivateUser: async (userId: string) => {
    return await axiosClient.delete(`users/deactivate/${userId}`)
  },
  activeUser: async (userId: string) => {
    return await axiosClient.patch(`users/active/${userId}`)
  }
}
