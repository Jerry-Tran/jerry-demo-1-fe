import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { Button, Input, Spin, Typography } from 'antd'

import { resetMessage } from '@/store/slices'

const { Text } = Typography
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

export function Newpassword({loading, handleResetPassword }) {

  const dispatch = useDispatch()

  const { message } = useSelector((state) => state.auth)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  return (
    <>
      <h1 className='text-3xl font-semibold mb-4'>Reset Password</h1>
      {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
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
  )
}
