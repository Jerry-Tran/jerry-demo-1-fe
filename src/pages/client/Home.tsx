import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { Element } from 'react-scroll'

import { Space } from 'antd'

import { CustomBtn } from '@/components'

import { AppDispatch } from '@/store'
import { resetMessage } from '@/store/slices'

import { Contact, Feature, Pricing } from './index'

export function Home() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(resetMessage())
  }, [dispatch])

  return (
    <Element name='home'>
      <div className='h-screen bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold mb-4'>Manage Your Passwords Securely</h1>
          <p className='text-lg mb-8'>
            Go Pass Manager helps you safely store and manage all your passwords with ease.
          </p>
          <Space>
            <CustomBtn title='Get Started' to='/register' type='primary' />
            <CustomBtn title='Learn more' to='/login' />
          </Space>
        </div>
      </div>
      <Feature />
      <Pricing />
      <Contact />
     
    </Element>
  )
}
