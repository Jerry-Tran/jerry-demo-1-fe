import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'

import { Layout } from 'antd'

import { AppDispatch, RootState } from '@/store'

import { SystemHeader } from './admin/Header'

import { Sidebar } from './admin/Sidebar'
import { useDispatch } from 'react-redux'
import { userService } from '@/services'
import { useSelector } from 'react-redux'

const { Content } = Layout

const contentStyle: React.CSSProperties = {
  backgroundColor: '#fafafa',
  overflowY: 'scroll'
}

const layoutStyle = {
  overflow: 'hidden',
  height: '100vh'
}
export function SystemLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        await dispatch(userService.getCurrentUser()).unwrap()
        navigate('/admin')
      } catch {
        navigate('/admin/login')
      }
    }

    if (!currentUser) {
      checkCurrentUser()
    }
  }, [navigate, dispatch, currentUser])

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
