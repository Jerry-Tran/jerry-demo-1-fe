import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { Link, useParams } from 'react-router-dom'

import { Fireworks } from '@fireworks-js/react'

import { AppDispatch } from '@/store'

import { authService } from '@/services'

export function ConfirmEmail() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(authService.confirmEmail(id))
    }
  }, [id, dispatch])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden'>
      <Fireworks
        options={{
          acceleration: 1.05,
          particles: 150,
          traceLength: 3
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      <div className='relative z-10 text-center p-6 bg-white/30 rounded-lg shadow-lg'>
        <h1 className='text-5xl font-extrabold text-white mb-4 drop-shadow-lg'>🎉 Confirm Email Successfully! 🎉</h1>
        <p className='text-lg text-white mb-6'>
          Congratulations, you have successfully verified your email. Please login to continue.
        </p>
        <Link
          to={'/login'}
          className='mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out hover:from-pink-500 hover:to-orange-500 hover:text-white'
        >
          Click to Login
        </Link>
      </div>
    </div>
  )
}
