import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout, DefaultLayout, SystemLayout } from '@/layouts'
import { Register, Login, ConfirmEmail, ForgotPassword, ConfirmInvitation } from '@/pages'
import { Dashboard, ManageUsers } from '@/pages/admin'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: []
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
    element: <SystemLayout />,
    children: [
      {
        path: '/admin',
        element: <Dashboard />,
        handle: { breadcrumb: 'Dashboard' }
      },
      {
        path: '/admin/users',
        element: <ManageUsers />,
        handle: { breadcrumb: 'Manage Users' }
      }
    ]
  },
  {
    path: '/confirm-invitation/:inviteId',
    element: <ConfirmInvitation />
  }
])
