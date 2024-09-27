import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { Outlet, useNavigate } from 'react-router-dom'

import { Layout } from 'antd'

import { RootState } from '@/store'

import { SystemHeader } from './admin/Header'

import { Sidebar } from './admin/Sidebar'

const { Content } = Layout

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fafafa'
}

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
}
export function SystemLayout() {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (!currentUser || currentUser?.role !== 'admin') {
      navigate('/admin/login')
    }
  }, [navigate, currentUser])
  return (
    <Layout style={layoutStyle}>
      <Sidebar />
      <Layout>
        <SystemHeader />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
