import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

const { Header, Footer, Content } = Layout

export const DefaultLayout = () => {
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
