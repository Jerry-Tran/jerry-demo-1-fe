import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { Result, message, Form } from 'antd'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { authService } from '@/services'

import { resetMessage } from '@/store/slices'
import { AppDispatch, RootState } from '@/store'

import { useBoolean } from '@/hooks'

import { IRegisterData } from '@/interfaces'

import { authFields } from '@/utils/constants'

import { CustomBtn, CustomInput } from '@/components'

import authBg from '@/assets/images/auth-bg.png'

const schema = yup.object().shape({
  name: yup.string().required('Please input your name!'),
  email: yup.string().email('Please input a valid email!').required('Please input your email!'),
  password: yup.string().min(8, 'Password needs to be at least 8 characters.').required('Please input your password!'),
  confirmPassword: yup
    .string()
    .required('Please input your password!')
    .oneOf([yup.ref('password')], 'passwords must match')
})

export function Register() {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const { currentUser, message: msg, error } = useSelector((state: RootState) => state.auth)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleRegister = async (data: IRegisterData) => {
    try {
      setLoading()
      await dispatch(authService.register(data))
      setUnloading()
    } catch (error) {
      message.error('Register failed ' + error)
    }
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='w-full mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden h-full'>
        <div className='hidden lg:block w-[60%] h-full'>
          <img src={authBg} alt='Auth Background' className='object-cover h-full w-full' />
        </div>
        {msg && !error ? (
          <Result
            className='flex-1 animate-fadeIn'
            status='success'
            title='Successfully! Please check your email!'
            extra={[
              <Link
                to='/login'
                className='bg-[#52c41a] px-4 py-3 font-bold rounded-md text-white hover:text-white hover:opacity-80'
              >
                Login
              </Link>
            ]}
          />
        ) : (
          <div className='flex flex-1 bg-white'>
            <div className='m-auto w-[80%]'>
              <h1 className='text-3xl font-semibold mb-4'>Sign up</h1>
              {msg && <p className='text-red-500 mb-2 text-lg'>{msg}</p>}
              <span className='text-lg'>If you already have an account.</span>
              <br />
              <span className='text-lg inline-block mr-2'>You can</span>
              <Link to='/login' className='text-lg text-primary-500 font-semibold hover:underline'>
                Login here!
              </Link>
              <Form className='mt-6' onFinish={handleSubmit(handleRegister)} layout='vertical'>
                {authFields.map((field) => (
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
                ))}

                <CustomBtn
                  title='Register'
                  type='primary'
                  htmlType='submit'
                  className='additional-custom-class'
                  disabled={loading}
                  loading={loading}
                />
              </Form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
