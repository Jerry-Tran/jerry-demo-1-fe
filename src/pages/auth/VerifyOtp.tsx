import React, { useEffect, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

import { Button, Input, Row, Col, Spin } from 'antd'

import { resetMessage } from '@/store/slices'

const otpSchema = yup.object().shape({
  otp: yup.array().length(6, 'dsadas').of(yup.string().required('Otp must have fill full'))
})

export function VerifyOtp({ loading, onVerifyOtp }) {

  const dispatch = useDispatch()

  const { message } = useSelector((state) => state.auth)

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

  const otpValue = watch('otp')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    if (/^[0-9]{0,1}$/.test(value)) {
      const otp = getValues('otp')
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

  const onSubmit = (data: any) => {
    const otpValue = data.otp.join('')
    onVerifyOtp(otpValue)
  }

  return (
    <div className='flex flex-1 bg-white'>
      <div className='max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow m-2'>
        <header className='mb-8'>
          <h1 className='text-2xl font-bold mb-1'>Verify Your Account</h1>
          {message && <p className='text-red-500 mb-2 text-lg'>{message}</p>}
          <p className='text-[15px] text-slate-500'>
            A 6-digit OTP code has been sent via your email.
            <br />
            Please enter the code below
          </p>
        </header>
        <form id='otp-form' onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={12} justify='space-between'>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <Col key={index}>
                  <Controller
                    name={`otp[${index}]`}
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
                        className='lg:w-[50px] lg:h-[50px] text-center w-[40px] h-[40px]'
                      />
                    )}
                  />
                </Col>
              ))}
          </Row>

          {errors.otp && <p className='text-left text-red-500 mt-2'>{errors.otp[errors.otp.length - 1].message}</p>}

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

        <div className='text-sm text-slate-500 mt-4'>
          Didn't receive the OTP?
          <Button type='link' className='font-medium' onClick={() => {}}>
            Resend OTP
          </Button>
        </div>
      </div>
    </div>
  )
}
