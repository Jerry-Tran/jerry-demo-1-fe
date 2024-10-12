import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { BiSolidUserAccount, FaUsers, ImProfile, TbLayoutDashboardFilled } from '@/utils/icons'
import logo from '@/assets/images/secure.png'

const { Sider } = Layout

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fafafa'
}

const sideBarMenu = [
  {
    key: '1',
    to: '/admin',
    icon: <TbLayoutDashboardFilled />,
    text: 'Dashboard'
  },
  {
    key: '2',
    to: '/admin/users',
    icon: <FaUsers />,
    text: 'Users'
  },
  {
    key: '3',
    to: '/admin/workspaces',
    icon: <BiSolidUserAccount />,
    text: 'Workspaces'
  },
  {
    key: '4',
    to: '/admin/profile',
    icon: <ImProfile />,
    text: 'Profile'
  }
]

const menuItems = sideBarMenu.map((item) => ({
  key: item.key,
  label: (
    <NavLink to={item.to} className={`flex items-center w-full`}>
      <span className='text-2xl text-primary-500 p-2 rounded-md mr-2'>{item.icon}</span>
      <span className='text-slate-600 font-normal text-lg'>{item.text}</span>
    </NavLink>
  ),
  style: { marginBottom: '15px' }
}))

export function Sidebar() {
  return (
    <Sider style={siderStyle} className='bg-system-primary'>
      <div className='flex items-center m-4'>
        <img src={logo} alt='logo' className='w-12' />
        <h2 className='text-2xl font-bold text-blue-600'>GoPass</h2>
      </div>
      <Menu
        className='bg-system-primary'
        mode='vertical'
        items={menuItems}
        defaultSelectedKeys={['1']} 
      />
    </Sider>
  )
}
