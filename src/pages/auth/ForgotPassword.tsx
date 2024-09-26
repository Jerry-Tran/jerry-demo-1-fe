import { useEffect } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { Button, Input, Result, Spin, Typography, message } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { AppDispatch, RootState } from '@/store'
import { resetMessage } from '@/store/slices'

import { authService } from '@/services'

import authBg from '@/assets/images/forgot-password-bg.png'

import { VerifyOtp } from './VerifyOtp'
import { Newpassword } from './NewPassword'
import { useBoolean } from '@/hooks'
import { localStorageKeys } from '@/utils/constants'

type ResetPasswordData = {
  password: string
  confirmPassword: string
}

const { Text } = Typography

const emailSchema = yup.object().shape({
  email: yup.string().email('Please input a valid Email!').required('Please input your Email!')
})

export function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>()

  const { message: msg } = useSelector((state: RootState) => state.auth)

  const { value: showOtp, setTrue: setShowOtp } = useBoolean(false)

  const { value: showResult, setTrue: setShowResult } = useBoolean(false)

  const { value: showNewPasswordForm, setTrue: setShowNewPasswordForm } = useBoolean(false)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })

  const handleForgotPassword = async (data: { email: string }) => {
    setLoading()
    try {
      await dispatch(authService.forgotPassword(data.email))
      localStorage.setItem(localStorageKeys.currentEmail, data.email)
      setShowOtp()
    } catch (error) {
      message.error('Forgot password failed: ' + (error as Error).message)
    }
    setUnloading()
  }

  const handleVerifyOtp = async (otp: string) => {
    const payload = { email: localStorage.getItem(localStorageKeys.currentEmail) || '', otp }

    if (!payload.email) {
      message.error('Not found email')
      return
    }

    setLoading()
    try {
      await dispatch(authService.verifyOtp(payload))
      setShowNewPasswordForm()
    } catch (error) {
      message.error('Verify OTP failed: ' + (error as Error).message)
    }
    setUnloading()
  }

  const handleResetPassword = async (data: ResetPasswordData) => {
    const payload = {
      email: localStorage.getItem(localStorageKeys.currentEmail) || '',
      password: String(data.password)
    }
    if (!payload.email) {
      message.error('Not found email')
      return
    }

    setLoading()

    try {
      await dispatch(authService.resetPassword(payload))
      setShowResult()
    } catch (error) {
      message.error('Reset password failed: ' + (error as Error).message)
    }
    setUnloading()
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        <div className='flex flex-1 bg-white'>
          <div className={`m-auto ${showOtp && showResult && !showNewPasswordForm ? 'w-full' : 'w-[80%]'}`}>
            {!showOtp && !showNewPasswordForm && (
              <>
                <h1 className='text-3xl font-semibold mb-4'>Forgot password</h1>
                {msg && <p className='text-red-500 mb-2 text-lg'>{msg}</p>}
                <p>Please fill your email!</p>
                <form className='mt-4' onSubmit={handleSubmit(handleForgotPassword)}>
                  <div className=''>
                    <label className='font-semibold' htmlFor=''>
                      Email
                    </label>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          size='large'
                          placeholder='Enter your email address'
                          type='email'
                          prefix={<MailOutlined />}
                          className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                        />
                      )}
                    />
                    {errors.email && <Text type='danger'>{errors.email.message}</Text>}
                  </div>

                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={loading}
                    className='w-full h-12 mt-4 border-none font-bold rounded-md bg-primary-800 
             disabled:bg-primary-800 disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {loading ? <Spin className='text-rose-600' /> : 'Send'}
                  </Button>
                </form>
              </>
            )}

            {showOtp && !showNewPasswordForm && <VerifyOtp loading={loading} onVerifyOtp={handleVerifyOtp} />}
            {showNewPasswordForm && !showResult && (
              <Newpassword loading={loading} handleResetPassword={handleResetPassword} />
            )}
            {showResult && (
              <Result
                className='flex-1 p-0 animate-fadeIn'
                status='success'
                title='Reset password successfully. Please login again!!'
                extra={[
                  <Link
                    to='/login'
                    className='bg-[#52c41a] px-4 py-3 font-bold rounded-md text-white hover:text-white hover:opacity-80'
                  >
                    Login
                  </Link>
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
