import React from 'react'

import { Link } from 'react-router-dom'

import { Button, Input, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { apiLogin } from '@/apis'

import authBg from '@/assets/images/auth-bg.png'

const { Text } = Typography

const schema = yup.object().shape({
  email: yup.string().email('Please input a valid Email!').required('Please input your Email!'),
  password: yup.string().min(8, 'Password needs to be at least 8 characters.').required('Please input your Password!')
})

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleLogin = async (data: any) => {
    const response = await apiLogin(data)
    console.log(response)
  }

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        <div className='flex flex-1 bg-white'>
          <div className='m-auto w-[80%]'>
            <h1 className='text-3xl font-semibold mb-4'>Sign in</h1>
            <p>If you don't have an account.</p>
            <span className='inline-block mr-2'>You can</span>
            <Link to='/register' className='text-[#5067f7] font-semibold'>
              Register here!
            </Link>
            <form className='mt-6' onSubmit={handleSubmit(handleLogin)}>
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
              <Button
                type='primary'
                htmlType='submit'
                className='w-full h-12 mt-4 border-none font-bold rounded-md bg-primary-800'
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
