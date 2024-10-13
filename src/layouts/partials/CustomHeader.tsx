import { useState } from 'react'

import { scroller } from 'react-scroll'

import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'

import { CustomBtn } from '@/components'

import logo from '@/assets/images/secure.png'

const { Header } = Layout

const menuItems = [
  {
    key: 'home',
    label: 'Home',
    onClick: () => scroller.scrollTo('home', { smooth: true, duration: 500, offset: -80 })
  },
  {
    key: 'feature',
    label: 'Feature',
    onClick: () => scroller.scrollTo('feature', { smooth: true, duration: 500, offset: -80 })
  },
  {
    key: 'pricing',
    label: 'Pricing',
    onClick: () => scroller.scrollTo('pricing', { smooth: true, duration: 500, offset: -80 })
  },
  {
    key: 'contact',
    label: 'Contact',
    onClick: () => scroller.scrollTo('contact', { smooth: true, duration: 500, offset: -80 })
  }
]

export const CustomHeader = () => {
  const [selectedKey, setSelectedKey] = useState('home')

  const onClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key)
  }

  return (
    <Header className='bg-white shadow-md fixed w-full z-50 px-10 flex justify-between items-center'>
      <img src={logo} alt='logo' className='w-12' />
      <h2 className='text-2xl font-bold text-blue-600'>GoPass</h2>

      <Menu
        items={menuItems}
        onClick={onClick}
        mode='horizontal'
        selectedKeys={[selectedKey]}
        className='border-none flex-grow text-blue-500 justify-center text-lg font-medium'
      />
      <div className='flex mb-2'>
        <CustomBtn title='Login' to='/login' className='mr-2 h-11' />
        <CustomBtn title='Register' to='/register' type='primary' className='h-11' />
      </div>
    </Header>
  )
}
