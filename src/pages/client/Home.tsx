import { useDispatch } from 'react-redux'

import { Button } from 'antd'

import { authService } from '@/services'

import { AppDispatch } from '@/store'

export function Home() {
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(authService.logout())
  }
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
