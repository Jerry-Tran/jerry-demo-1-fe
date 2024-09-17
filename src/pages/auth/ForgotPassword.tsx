import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Input, Spin, Typography } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { forgotPasswordService, verifyOtpService, resetPasswordService } from '@/services'

import { VerifyOtp } from './VerifyOtp'

import { resetMessage } from '@/store/slices'

import authBg from '@/assets/images/forgot-password-bg.png'

const { Text } = Typography

const emailSchema = yup.object().shape({
  email: yup.string().email('Please input a valid Email!').required('Please input your Email!')
})

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Password must be at least 6 characters long')
    .required('Please input your new password!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your new password!')
})

export function ForgotPassword() {
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState<boolean>(false)
  const [showOtp, setShowOtp] = useState<boolean>(false)
  const [showNewPasswordForm, setShowNewPasswordForm] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(showNewPasswordForm ? passwordSchema : emailSchema)
  })

  const handleForgotPassword = async (data: any) => {
    setLoading(true)
    await dispatch(forgotPasswordService(data.email))
    setLoading(false)
    localStorage.setItem('curr_email', data.email)
    setShowOtp(true)
  }

  const handleVerifyOtp = async (otp: string) => {
    const payload = { email: localStorage.getItem('curr_email'), otp }
    setLoading(true)
    await dispatch(verifyOtpService(payload))
    setLoading(false)
    setShowNewPasswordForm(true)
  }

  const handleResetPassword = async (data: any) => {
    const payload = { email: localStorage.getItem('curr_email'), password: data.password }
    setLoading(true)
    await dispatch(resetPasswordService(payload))
    setLoading(false)
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
          <div className='m-auto w-[80%]'>
            {!showOtp && !showNewPasswordForm && (
              <>
                <h1 className='text-3xl font-semibold mb-4'>Forgot password</h1>
                {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
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

            {showOtp && !showNewPasswordForm && <VerifyOtp onVerifyOtp={handleVerifyOtp} />}

            {showNewPasswordForm && (
              <>
                <h1 className='text-3xl font-semibold mb-4'>Reset Password</h1>
                <form className='mt-4' onSubmit={handleSubmit(handleResetPassword)}>
                  <div className=''>
                    <label className='font-semibold' htmlFor='password'>
                      New Password
                    </label>
                    <Controller
                      name='password'
                      control={control}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          size='large'
                          placeholder='Enter new password'
                          className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                        />
                      )}
                    />
                    {errors.password && <Text type='danger'>{errors.password.message}</Text>}
                  </div>

                  <div className='mt-4'>
                    <label className='font-semibold' htmlFor='confirmPassword'>
                      Confirm Password
                    </label>
                    <Controller
                      name='confirmPassword'
                      control={control}
                      render={({ field }) => (
                        <Input.Password
                          {...field}
                          size='large'
                          placeholder='Confirm your new password'
                          className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                        />
                      )}
                    />
                    {errors.confirmPassword && <Text type='danger'>{errors.confirmPassword.message}</Text>}
                  </div>

                  <Button
                    type='primary'
                    htmlType='submit'
                    disabled={loading}
                    className='w-full h-12 mt-4 border-none font-bold rounded-md bg-primary-800 
             disabled:bg-primary-800 disabled:text-white disabled:opacity-70 disabled:cursor-not-allowed'
                  >
                    {loading ? <Spin className='text-rose-600' /> : 'Reset Password'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
