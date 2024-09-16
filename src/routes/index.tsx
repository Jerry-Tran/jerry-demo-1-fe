import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout, DefaultLayout, SystemLayout } from '@/layouts'
import { Register, Login } from '@/pages'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
])
