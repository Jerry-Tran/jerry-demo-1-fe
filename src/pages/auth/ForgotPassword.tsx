import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form, Result, message } from 'antd'

import { AppDispatch, RootState } from '@/store'
import { resetMessage } from '@/store/slices'

import { useBoolean } from '@/hooks'

import { authService } from '@/services'

import { CustomBtn, CustomInput } from '@/components'

import { localStorageKeys } from '@/utils/constants'
import { IoMdClose } from '@/utils/icons'

import authBg from '@/assets/images/forgot-password-bg.png'

import { VerifyOtp } from './VerifyOtp'
import { Newpassword } from './NewPassword'

type ResetPasswordData = {
  password: string
  confirmPassword: string
}

const emailSchema = yup.object().shape({
  email: yup.string().email('Please input a valid Email!').required('Please input your Email!')
})

export function ForgotPassword() {
  const navigate = useNavigate()
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
    const response = await dispatch(authService.forgotPassword(data.email))
    if (response.meta.requestStatus === 'fulfilled') {
      localStorage.setItem(localStorageKeys.currentEmail, data.email)
      setShowOtp()
    } else {
      message.error('Forgot password failed: ')
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
    const response = await dispatch(authService.verifyOtp(payload))
    if (response.meta.requestStatus === 'fulfilled') {
      setShowNewPasswordForm()
    } else {
      message.error('Verify OTP failed')
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
    const response = await dispatch(authService.resetPassword(payload))
    if (response.meta.requestStatus === 'fulfilled') {
      setShowResult()
    } else {
      message.error('Reset password failed')
    }
    setUnloading()
  }

  const onBack = () => {
    navigate('/')
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex xs:flex-col xs:px-4 lg:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] xl:h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        <button className='lg:hidden hover:bg-gray-300 cursor-pointer xs:block xs:w-full py-4' onClick={onBack}>
          <span>
            <IoMdClose className='text-3xl text-gray-700 font-semibold float-right' />
          </span>
        </button>
        <div className='flex flex-1 bg-white xs:w-full xs:mb-64 lg:mb-0'>
          <div className={`m-auto ${showOtp && showResult && !showNewPasswordForm ? 'w-full' : 'lg:w-[80%] xs:w-full'}`}>
            {!showOtp && !showNewPasswordForm && (
              <div>
                <h1 className='text-3xl font-semibold mb-4'>Forgot password</h1>
                {msg && <p className='text-red-500 mb-2 text-lg'>{msg}</p>}
                <Form className='mt-6' onFinish={handleSubmit(handleForgotPassword)} layout='vertical'>
                  <CustomInput
                    name='email'
                    label='Email'
                    size='large'
                    control={control}
                    errors={errors}
                    placeholder='Enter your email'
                  />
                  <CustomBtn title='Submit' type='primary' htmlType='submit' disabled={loading} loading={loading} />
                </Form>
              </div>
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
