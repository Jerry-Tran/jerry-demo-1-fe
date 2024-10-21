import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { Layout } from 'antd'

import { AppDispatch } from '@/store'
import { userService } from '@/services'
import { CustomFooter, CustomHeader } from './partials'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

export const DefaultLayout = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const checkCurrentUser = async () => {
      await dispatch(userService.getCurrentUser())
    }
    checkCurrentUser()
  }, [dispatch])
  return (
    <Layout className='min-h-screen overflow-x-hidden'>
      <CustomHeader />
      <Content className='mt-16'>
        <Outlet />
      </Content>

      <CustomFooter />
    </Layout>
  )
}
