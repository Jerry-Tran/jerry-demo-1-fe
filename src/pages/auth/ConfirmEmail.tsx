import { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { authService } from '@/services'

import { AppDispatch, RootState } from '@/store'

import { CustomBtn, CustomError } from '@/components'

export function ConfirmEmail() {
  const { message, error } = useSelector((state: RootState) => state.auth)
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(authService.confirmEmail(id))
    }
  }, [id, dispatch])

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      {error ? (
        <CustomError
          status='error'
          title='Verify email failed'
          subTitle={message}
          extra={[
            <>
              <CustomBtn title='Back home' to='/' className='!w-[120px]' />
              <CustomBtn title='Register' to='/register' type='primary' className='!w-[120px]' />
            </>
          ]}
        />
      ) : (
        <CustomError
          status='success'
          title='Verify email successfully'
          subTitle={message}
          extra={[
            <>
              <CustomBtn title='Back home' to='/' type='primary' className='!w-[120px]' />
              <CustomBtn title='Login' to='/login' className='!w-[120px]' />
            </>
          ]}
        />
      )}
    </div>
  )
}
