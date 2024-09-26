import { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Layout } from 'antd'

import { RootState } from '@/store'

const { Header, Footer, Content } = Layout

export const DefaultLayout = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate])

  return (
    <Layout className='w-full max-w-full overflow-hidden'>
      <Header className='text-center text-white h-16 px-12 leading-[64px] bg-[#4096ff]'>Header</Header>
      <Content className='text-center min-h-[120px] text-white bg-[#0958d9]'>
        <Outlet />
      </Content>
      <Footer className='text-center text-white bg-[#4096ff]'>Footer</Footer>
    </Layout>
  )
}
