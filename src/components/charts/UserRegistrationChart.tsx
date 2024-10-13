import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Select } from 'antd'
import { Column } from '@ant-design/charts'

import { dashboardService } from '@/services'

import { AppDispatch, RootState } from '@/store'

const { Option } = Select

export function UserRegistrationChart() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedYear, setSelectedYear] = useState(2024)
  const { chartDataUsersRegistered } = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    const getChartData = async () => {
      await dispatch(dashboardService.getStatisticUsersRegistered())
    }
    getChartData()
  }, [dispatch])

  const filteredData = chartDataUsersRegistered?.data.filter((item) => item.year === selectedYear)

  const config = {
    data: filteredData,
    xField: 'month',
    yField: 'value',
    label: {
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    meta: {
      month: { alias: 'Month' },
      value: { alias: 'Users Registered' }
    }
  }

  return (
    <div className='p-4 shadow-lg bg-white rounded-lg'>
      <h3 className='text-lg font-bold mb-2'>User Registrations</h3>
      <div className='flex mb-4'>
        <Select className='mr-2' defaultValue='2024' onChange={(value) => setSelectedYear(Number(value))}>
          {chartDataUsersRegistered?.years?.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
      <Column {...config} />
    </div>
  )
}
