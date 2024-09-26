import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, DefaultLayout, SystemLayout } from '@/layouts'

import { Register, Login, ConfirmEmail, Home, ForgotPassword } from '@/pages'
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
      },
      {
        path: '/confirm-email/:id',
        element: <ConfirmEmail />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
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
