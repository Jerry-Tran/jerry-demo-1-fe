import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form } from 'antd'

import { RootState } from '@/store'
import { resetMessage } from '@/store/slices'

import { CustomBtn, CustomInput } from '@/components'

import { authFields } from '@/utils/constants'

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
type ResetPasswordData = {
  password: string
  confirmPassword: string
}
type NewPasswordProps = {
  loading: boolean
  handleResetPassword: (data: ResetPasswordData) => Promise<void>
}

export function Newpassword({ loading, handleResetPassword }: NewPasswordProps) {
  const dispatch = useDispatch()

  const { message } = useSelector((state: RootState) => state.auth)

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
    <section>
      <h1 className='text-3xl font-semibold mb-4'>Reset Password</h1>
      {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
      <Form className='mt-6' onFinish={handleSubmit(handleResetPassword)} layout='vertical'>
        {authFields.map((field) => {
          if (field.name === 'password' || field.name === 'confirmPassword')
            return (
              <CustomInput
                name={field.name}
                label={field.label}
                control={control}
                errors={errors}
                placeholder={field.placeholder}
                prefixIcon={field.prefixIcon}
              />
            )
        })}

        <CustomBtn title='Reset Password' type='primary' htmlType='submit' disabled={loading} loading={loading} />
      </Form>
    </section>
  )
}
