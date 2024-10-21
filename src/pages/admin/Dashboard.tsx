import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AccountDomainChart, UserRegistrationChart } from '@/components'
import { dashboardService } from '@/services'
import { AppDispatch, RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Card, Col, Row, Statistic } from 'antd'

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { quantityUser, quantityAccount, quantityWorkspace } = useSelector((state: RootState) => state.dashboard)
  useEffect(() => {
    const getQuantity = async () => {
      Promise.all([
        await dispatch(dashboardService.getQuantityUser()),
        await dispatch(dashboardService.getQuantityAccount()),
        await dispatch(dashboardService.getQuantityWorkspace())
      ])
    }
    getQuantity()
  }, [dispatch])
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <Row gutter={16} className='mb-5'>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title='User' value={quantityUser} valueStyle={{ color: '#0A2FB6' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title='Account' value={quantityAccount} valueStyle={{ color: '#0A2FB6' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic title='Workspace' value={quantityWorkspace} valueStyle={{ color: '#0A2FB6' }} />
          </Card>
        </Col>
      </Row>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <UserRegistrationChart />
        <AccountDomainChart />
      </div>
    </div>
  )
}
