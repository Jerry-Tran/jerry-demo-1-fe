import React from 'react'
import {  Result } from 'antd'
import { CustomBtn } from './CustomBtn'

type ErrorProps = {
  status: '403' | '404' | '500'
  title: string
  subTitle: string
}

export const CustomError: React.FC<ErrorProps> = ({ status, title, subTitle }) => (
  <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={<CustomBtn title='Back home' to='/' type='primary' className='!w-[120px]'/>}
  />
)
