import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { Button, Input, Row, Col } from 'antd'

import { resetMessage } from '@/store/slices'
import { AppDispatch, RootState } from '@/store'

import { CustomBtn } from '@/components'

type VerifyOtpProps = {
  loading: boolean
  onVerifyOtp: (otp: string) => void
}
type FormData = {
  otp: string[]
}

const otpSchema = yup.object().shape({
  otp: yup.array().required().length(6).of(yup.string().required('Otp must have fill full'))
})
export function VerifyOtp({ loading, onVerifyOtp }: VerifyOtpProps) {
  const dispatch = useDispatch<AppDispatch>()

  const { message } = useSelector((state: RootState) => state.auth)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputs = useRef<any[]>([])

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: Array(6).fill('')
    }
  })

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  const otpValue = watch('otp') || []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    if (/^[0-9]{0,1}$/.test(value)) {
      const otp = getValues('otp') || []
      otp[index] = value
      setValue('otp', otp)
      if (value && index < otp.length - 1) {
        inputs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
      e.preventDefault()
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (index > 0) {
        inputs.current[index - 1].focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text')
    if (!new RegExp(`^[0-9]{6}$`).test(text)) {
      return
    }
    const digits = text.split('')
    setValue('otp', digits)
    inputs.current[5].focus()
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const onSubmit = (data: FormData) => {
    const otpValue = data.otp.join('')
    onVerifyOtp(otpValue)
  }

  return (
    <div className='flex flex-1 bg-white'>
      <div className='max-w-md mx-auto text-center bg-white px-4 xs:px-1 sm:px-8 py-10 rounded-xl'>
        <header className='mb-8'>
          <h1 className='text-2xl font-bold mb-1'>Verify Your Account</h1>
          {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
          <span className='text-base text-slate-600'>
            A 6-digit OTP code has been sent via your email.
            <br />
            Please enter the code below
          </span>
        </header>
        <form id='otp-form' onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={12} justify='space-between'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Col key={`otp.${index}`}>
                  <Controller
                    name={`otp.${index}`}
                    control={control}
                    render={() => (
                      <Input
                        type='text'
                        value={otpValue[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={handleFocus}
                        onPaste={handlePaste}
                        ref={(el) => (inputs.current[index] = el)}
                        maxLength={1}
                        className='lg:w-[50px] lg:h-[50px] text-center w-[40px] h-[40px] xs:w-[45px] xs:h-[45px] text-base'
                      />
                    )}
                  />
                </Col>
              ))}
          </Row>

          {errors.otp && Array.isArray(errors.otp) && errors.otp.length > 0 && (
            <p className='text-left text-base font-normal text-red-500 mt-2'>{errors.otp[errors.otp.length - 1].message}</p>
          )}

          <CustomBtn title='Send' type='primary' htmlType='submit' disabled={loading} />
        </form>

        <div className='text-base text-slate-500 mt-4'>
          Didn't receive the OTP?
          <Button type='link' className='font-medium text-base'>
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  )
}
