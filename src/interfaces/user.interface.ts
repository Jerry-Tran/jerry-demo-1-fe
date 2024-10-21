export interface UserInfo {
  id: string
  name: string
  email: string
  isauthenticated: boolean
  accountscount: string
  workspacescount: string
  deleted: string
}
export interface ChangePassWordData {
  currentPassword: string
  newPassword: string
}
