import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'

import { Flex } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import { AppDispatch } from '@/store'

import { authService } from '@/services'

import { CustomBtn } from '@/components'

export function ConfirmEmail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(authService.confirmEmail(id))
    }
  }, [id, dispatch])
  const handleRedirect = (path: string) => () => {
    navigate(`${path}`)
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='bg-white p-10 rounded-md shadow-lg flex flex-col items-center border border-gray-100'>
        <CheckCircleOutlined className='text-green-500 text-6xl mb-4' />
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Email Confirmed!</h1>
        <span className='text-lg text-center text-gray-600 mb-4'>
          Congratulations! Your email has been successfully confirmed. You can now proceed to log in and enjoy the
          platform.
        </span>

        <Flex justify='space-between'>
          <CustomBtn title='Go to home' onClick={handleRedirect('/')} className='mr-2' />
          <CustomBtn title='Go to extension' type='primary' onClick={handleRedirect('/extension')} />
        </Flex>
      </div>
    </div>
  )
}
