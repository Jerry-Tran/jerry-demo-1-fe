import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Bar } from 'react-chartjs-2'
import { Chart, registerables, TooltipItem } from 'chart.js'

import { Select } from 'antd'

import { dashboardService } from '@/services'

import { AppDispatch, RootState } from '@/store'

const { Option } = Select

Chart.register(...registerables)

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

  const data = {
    labels: filteredData.map((item) => item.month),
    datasets: [
      {
        label: 'Users Registered',
        data: filteredData.map((item) => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
        grid: {
          display: false, 
        },
        beginAtZero: true
      },
    },
    plugins: {
      legend: {
        position: 'top' as const 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar'>) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
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
      <Bar data={data} options={options} />
    </div>
  )
}
