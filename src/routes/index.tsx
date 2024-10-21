import { createBrowserRouter } from 'react-router-dom'

import { AuthLayout, DefaultLayout, SystemLayout } from '@/layouts'

import { Register, Login, ConfirmEmail, ForgotPassword, ConfirmInvitation, Profile, Home } from '@/pages'

import { Dashboard, ManageUsers } from '@/pages/admin'

import { CustomError } from '@/components'

import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute role='user'>
            <Profile />
          </ProtectedRoute>
        )
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
      },
      {
        path: '/admin/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/',
    element: (
      <ProtectedRoute role='admin'>
        <SystemLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/admin',
        element: (
          <ProtectedRoute role='admin'>
            <Dashboard />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'Dashboard' }
      },
      {
        path: '/admin/users',
        element: (
          <ProtectedRoute role='admin'>
            <ManageUsers />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'Manage Users' }
      },
      {
        path: '/admin/profile',
        element: (
          <ProtectedRoute role='admin'>
            <Profile />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'Profile' }
      }
    ]
  },
  {
    path: '/confirm-invitation/:inviteId',
    element: <ConfirmInvitation />
  },
  {
    path: '*',
    element: <CustomError status='404' title='404' subTitle='Sorry, the page you visited does not exist.' />
  }
])
