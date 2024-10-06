export interface IRegisterPayload {
  message: string
}
export interface ICurrentUser {
  id: string
  name: string
  role: string
  email: string
}
export interface ILoginPayload {
  message: string
  currentUser: ICurrentUser
}

export interface IErrorPayload {
  message: string
  errorCode: string
}

export interface IRegisterData {
  name: string
  email: string
  password: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IVerifyOTP {
  email: string
  otp: string
}

export interface IResetPasswordData {
  email: string
  password: string
}
