import { useDispatch, useSelector } from 'react-redux'

import { Layout, Dropdown, MenuProps } from 'antd'

import { AppDispatch, RootState } from '@/store'

import { authService } from '@/services'

import { CustomBreadcrumb } from '@/components'

import { FaUserCircle, IoLogOut, IoSettingsSharp } from '@/utils/icons'


const { Header } = Layout

export function SystemHeader() {
  const dispatch = useDispatch<AppDispatch>()
  const { currentUser } = useSelector((state: RootState) => state.auth)

  const handleLogout = async () => {
   dispatch(authService.logout())
  }

  const userAction: MenuProps['items'] = [
    {
      key: 'settings',
      label: (
        <button className='flex items-center text-slate-700'>
          <span className='text-slate-700 text-xl mr-2'>
            <IoSettingsSharp />
          </span>
          <span className='text-lg'>Settings</span>
        </button>
      )
    },
    {
      key: 'logout',
      label: (
        <button className='flex items-center text-slate-700' onClick={handleLogout}>
          <span className='text-slate-700 text-xl mr-2'>
            <IoLogOut />
          </span>
          <span className='text-lg'>Logout</span>
        </button>
      )
    }
  ]

  return (
    <Header className='flex justify-between items-center bg-system-primary'>
      <CustomBreadcrumb />
      <div className='flex items-center'>
        <Dropdown menu={{ items: userAction }} trigger={['click']}>
          <span className='flex items-center cursor-pointer'>
            <span className='text-lg mr-2'>{currentUser?.name}</span>
            <span className='text-primary-500 text-3xl'>
              <FaUserCircle />
            </span>
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}
