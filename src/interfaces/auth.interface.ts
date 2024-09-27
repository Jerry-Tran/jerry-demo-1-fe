export interface IRegisterPayload {
  message: string
}

export interface ILoginPayload {
  message: string
  currentUser: object
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