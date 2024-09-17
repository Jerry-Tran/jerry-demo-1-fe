import React from 'react'

import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, DefaultLayout, SystemLayout } from '@/layouts'

import { Register, Login, ConfirmEmail, Home, ForgotPassword, VerifyOtp } from '@/pages'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
      {
        path: '/auth/confirm-email/:id',
        element: <ConfirmEmail />
      },
      {
        path: '/auth/forgot-password',
        element: <ForgotPassword />
      },
      {
        path: '/auth/verify-otp',
        element: <VerifyOtp />
      }
    ]
  },
  {
    path: '/admin',
    element: <SystemLayout />,
    children: [
      {
        path: '/admin',
        element: <Login />
      }
    ]
  }
])
