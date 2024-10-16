import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Form, message } from 'antd'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { authService } from '@/services'

import { resetMessage } from '@/store/slices'
import { AppDispatch, RootState } from '@/store'

import { useBoolean } from '@/hooks'

import { ILoginData } from '@/interfaces'

import { authFields } from '@/utils/constants'

import { CustomBtn, CustomInput } from '@/components'

import authBg from '@/assets/images/auth-bg.png'

const schema = yup.object().shape({
  email: yup.string().email('Please input a valid Email!').required('Please input your email!'),
  password: yup.string().min(8, 'Password needs to be at least 8 characters.').required('Please input your password!')
})

export function Login() {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const { currentUser, message: msg } = useSelector((state: RootState) => state.auth)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const currentPath = window.location.pathname
  const handleLogin = async (data: ILoginData) => {
    try {
      setLoading()
      await dispatch(authService.login(data))
      setUnloading()
    } catch (error) {
      message.error('Login failed ' + error)
    }
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') navigate('/admin')
      else navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        <div className='flex flex-1 bg-white'>
          <div className='m-auto w-[80%]'>
            <h1 className='text-3xl font-semibold mb-4'>Sign in</h1>
            {msg && <p className='text-red-500 mb-2 text-lg'>{msg}</p>}
            {!currentPath.includes('admin') && (
              <>
                <span className='text-lg'>If you don't have an account.</span> <br />
                <span className='text-lg inline-block mr-2'>You can</span>
                <Link to='/register' className='text-lg text-blue-500 font-semibold hover:underline'>
                  Register here!
                </Link>
              </>
            )}
            <Form className='mt-6' onFinish={handleSubmit(handleLogin)} layout='vertical'>
              {authFields.map((field) => {
                if (field.name === 'email' || field.name === 'password')
                  return (
                    <CustomInput
                      key={field.name}
                      name={field.name}
                      size='large'
                      type={field.type}
                      label={field.label}
                      control={control}
                      errors={errors}
                      placeholder={field.placeholder}
                    />
                  )
              })}
              <button className='w-full text-right text-base font-normal text-red-500 hover:underline'>
                <Link to={'/forgot-password'} className='hover:text-red-500'>
                  Forgot password?
                </Link>
              </button>
              <CustomBtn title='Login' type='primary' htmlType='submit' disabled={loading} loading={loading} />
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
