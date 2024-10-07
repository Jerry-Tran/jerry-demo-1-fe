import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Pie } from '@ant-design/charts'

import { AppDispatch, RootState } from '@/store'
import { dashboardService } from '@/services'

export function AccountDomainChart() {
  const dispatch = useDispatch<AppDispatch>()
  const { chartDataAccountsOfUsers } = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    const getChartData = async () => {
      await dispatch(dashboardService.getStatisticAccountsOfUsers())
    }
    getChartData()
  }, [dispatch])

  const config = {
    appendPadding: 10,
    data: chartDataAccountsOfUsers,
    angleField: 'value',
    colorField: 'domain',
    radius: 0.8,
    label: {
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center'
      }
    },
    interactions: [{ type: 'element-active' }]
  }

  return (
    <div className='p-4 shadow-lg bg-white rounded-lg'>
      <h3 className='text-lg font-bold mb-2'>Accounts Of Users</h3>
      <Pie {...config} />
    </div>
  )
}
