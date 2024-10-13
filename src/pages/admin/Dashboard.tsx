import { AccountDomainChart, UserRegistrationChart } from '@/components'

export function Dashboard() {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <UserRegistrationChart />
        <AccountDomainChart />
      </div>
    </div>
  )
}
