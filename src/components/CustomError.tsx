import React from 'react'
import { Result } from 'antd'
type ErrorProps = {
  status: '403' | '404' | '500' | 'error' | 'info' | 'success' | 'warning'
  title: string
  subTitle: string
  extra: React.ReactNode[]
}

export const CustomError: React.FC<ErrorProps> = ({ status, title, subTitle, extra }) => (
  <Result status={status} title={title} subTitle={subTitle} extra={extra} className='text-xl'/>
)
