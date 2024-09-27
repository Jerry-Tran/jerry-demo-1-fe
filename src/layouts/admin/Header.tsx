import { Layout } from 'antd'
import Search from 'antd/es/input/Search'

import { FaUserCircle } from '@/utils/icons'
import { CustomBreadcrumb } from '@/components'

const { Header } = Layout

export function SystemHeader() {
  const onSearch = (data: string) => {
    // handle search after
  }

  const onChangeText = (data: string) => {
    // handle search after
  }
  return (
    <Header className='flex justify-between items-center bg-system-primary'>
      <CustomBreadcrumb />
      <div className='flex items-center'>
        <Search
          className='p-2'
          placeholder='input search text'
          onSearch={onSearch}
          onChange={(e) => onChangeText(e.target.value)}
          enterButton
        />
        <span className='text-2xl text-primary-500 ml-2'>
          <FaUserCircle />
        </span>
      </div>
    </Header>
  )
}
