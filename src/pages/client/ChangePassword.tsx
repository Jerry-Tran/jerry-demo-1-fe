import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Form, message, Result } from 'antd'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useBoolean } from '@/hooks'

import { AppDispatch, RootState } from '@/store'
import { resetMessage } from '@/store/slices'

import { authService } from '@/services'

import { ChangePassWordData } from '@/interfaces'

import { CustomBtn, CustomInput } from '@/components'

import { changePasswordFields } from '@/utils/constants'

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, 'Password needs to be at least 8 characters.')
    .required('Please input your current password!'),
  newPassword: yup
    .string()
    .min(8, 'Password needs to be at least 8 characters.')
    .required('Please input your new password!'),
  confirmPassword: yup
    .string()
    .required('Please input your password!')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

export const ChangePassword = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { error, message: msg } = useSelector((state: RootState) => state.auth)

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)
  const {
    value: showSuccessResult,
    setTrue: setShowSuccessResult,
    setFalse: setHiddenSuccessResult
  } = useBoolean(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(changePasswordSchema)
  })

  const handleChangePassword = async (changePasswordData: ChangePassWordData) => {
    try {
      setLoading()
      await dispatch(authService.changePassword(changePasswordData))
      setUnloading()
    } catch (error) {
      message.error('Change password failed ' + error)
    }
  }

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (msg && !error) {
      setShowSuccessResult()
      reset()
      timer = setTimeout(() => {
        setHiddenSuccessResult()
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [msg, error, setShowSuccessResult, setHiddenSuccessResult, reset])

  return (
    <section className='flex flex-col bg-white  py-6'>
      <div className='flex m-auto  md:flex-row xs:flex-col xs:px-2'>
        <article className='flex flex-col justify-start mt-6 mr-6 text-slate-800 text-lg'>
          <h3 className='font-semibold'>Change password</h3>
          <span>Update your password associated with your account.</span>
          {msg && error && <span className='text-red-500 mb-2 text-lg'>{msg}</span>}
        </article>
        {showSuccessResult ? (
          <Result className='flex-1 animate-fadeIn' status='success' title='Change password successfully' />
        ) : (
          <Form
            className='md:min-w-[400px] lg:min-w-[500px]'
            onSubmitCapture={handleSubmit(handleChangePassword)}
            layout='vertical'
          >
            {changePasswordFields.map((field) => (
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

            <CustomBtn title='Change password' type='primary' htmlType='submit' disabled={loading} loading={loading} />
          </Form>
        )}
      </div>
    </section>
  )
}
