import { NavLink } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { BiSolidUserAccount, FaUsers, ImProfile, TbLayoutDashboardFilled } from '@/utils/icons'
import logo from '../../assets/images/logo.jpg'

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
    to: '/admin/accounts',
    icon: <BiSolidUserAccount />,
    text: 'Accounts'
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
    <NavLink
      to={item.to}
      className={({ isActive }) => `flex items-center w-full`}
    >
      <span className={`text-xl text-primary-500 p-2 rounded-md mr-2 shadow-[0_4px_6px_rgb(0_0_0_/_12%)`}>{item.icon}</span>
      <span className='text-system-text font- text-md'>{item.text}</span>
    </NavLink>
  ),
  style: { marginBottom: '15px' }
}))

export function Sidebar() {
  return (
    <Sider style={siderStyle} className='bg-system-primary'>
      <div className='flex items-center m-4'>
        <img src={logo} alt='logo' className='w-[30px] h-[30px] mx-1' />
        <span className='text-lg text-primary-500'>Go Dashboard</span>
      </div>
      <Menu className='bg-system-primary' mode='vertical' items={menuItems} />
    </Sider>
  )
}
