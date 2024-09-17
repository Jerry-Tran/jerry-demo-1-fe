import React, { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Button, Input, Typography, Spin, Result } from 'antd'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { registerService } from '@/services'

import { resetMessage } from '@/store/slices'

import authBg from '@/assets/images/auth-bg.png'

const { Text } = Typography

const schema = yup.object().shape({
  name: yup.string().required('Please input your Name!'),
  email: yup.string().email('Please input a valid Email!').required('Please input your Email!'),
  password: yup.string().min(8, 'Password needs to be at least 8 characters.').required('Please input your Password!'),
  confirmPassword: yup
    .string()
    .required('Please input your Password!')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

export function Register() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { isLoggedIn, message, error } = useSelector((state) => state.auth)

  const [loading, setLoading] = React.useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleRegister = async (data) => {
    setLoading(true)
    await dispatch(registerService(data))
    setLoading(false)
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isLoggedIn && navigate('/')
  }, [isLoggedIn, navigate])

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        { !error ? (
          <Result
            className='flex-1 animate-fadeIn'
            status='success'
            title='Successfully! Please check your email!'
            extra={[
              <Link to='/auth/login' className='bg-[#52c41a] px-4 py-3 font-bold rounded-md text-white hover:text-white hover:opacity-80'>
                Login
              </Link>
            ]}
          />
        ) : (
          <div className='flex flex-1 bg-white'>
            <div className='m-auto w-[80%]'>
              <h1 className='text-3xl font-semibold mb-4'>Sign up</h1>
              {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
              <p>If you already have an account.</p>
              <span className='inline-block mr-2'>You can</span>
              <Link to='/auth/login' className='text-[#5067f7] font-semibold'>
                Login here!
              </Link>
              <form className='mt-6' onSubmit={handleSubmit(handleRegister)}>
                <div className='mb-8'>
                  <label className='font-semibold' htmlFor=''>
                    Username
                  </label>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size='large'
                        placeholder='Enter your User name'
                        prefix={<UserOutlined />}
                        className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                      />
                    )}
                  />
                  {errors.name && <Text type='danger'>{errors.name.message}</Text>}
                </div>
                <div className='mb-8'>
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
                        prefix={<MailOutlined />}
                        className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                      />
                    )}
                  />
                  {errors.email && <Text type='danger'>{errors.email.message}</Text>}
                </div>

                <div className='mb-8'>
                  <label className='font-semibold' htmlFor=''>
                    Password
                  </label>

                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        size='large'
                        placeholder='Enter your Password'
                        prefix={<LockOutlined />}
                        className='border-0 border-b-2 border-gray-400 hover:border-primary-800 focus:ring-0 focus:outline-none focus-within:shadow-none rounded-none px-0'
                      />
                    )}
                  />
                  {errors.password && <Text type='danger'>{errors.password.message}</Text>}
                </div>

                <div className='mb-8'>
                  <label className='font-semibold' htmlFor=''>
                    Confirm password
                  </label>

                  <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        size='large'
                        placeholder='Confirm your Password'
                        prefix={<LockOutlined />}
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
                  {loading ? <Spin className='text-rose-600' /> : 'Register'}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
