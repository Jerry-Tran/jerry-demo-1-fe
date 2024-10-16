import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js'

import { dashboardService } from '@/services'

import { AppDispatch, RootState } from '@/store'

ChartJS.register(ArcElement, Tooltip, Legend)

export function AccountDomainChart() {
  const dispatch = useDispatch<AppDispatch>()
  const { chartDataAccountsOfUsers } = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    const getChartData = async () => {
      await dispatch(dashboardService.getStatisticAccountsOfUsers())
    }
    getChartData()
  }, [dispatch])

  const data = {
    labels: chartDataAccountsOfUsers?.map((item) => item.domain) || [],
    datasets: [
      {
        data: chartDataAccountsOfUsers?.map((item) => item.value) || [],
        backgroundColor: ['#FF6384', '#36A2EB', '#fa885b', '#FFCE56', '#00cdc7']
      }
    ]
  }

  const options = {
    plugins: {
      legend: {
        position: 'top' as const
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'pie'>) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <div className='p-4 shadow-lg bg-white rounded-lg'>
      <h3 className='text-lg font-bold mb-2'>Accounts Of Users</h3>
      <div style={{ position: 'relative', height: '40vh', width: '40vw' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}
