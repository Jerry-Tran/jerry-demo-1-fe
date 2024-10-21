import { ReactNode, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'

import { userService } from '@/services';

import { AppDispatch, RootState } from '@/store'

import { CustomError } from '@/components'

type ProtectedRouteProps = {
  role: string
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const dispatch = useDispatch<AppDispatch>()

  const { isLoggedIn, currentUser } = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    const checkCurrentUser = async () => {
      await dispatch(userService.getCurrentUser())
    }
    checkCurrentUser()
  }, [dispatch])
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  if (role !== currentUser?.role) {
    return <CustomError status='403' title='403' subTitle='Sorry, you are not authorized to access this page.' />
  }
  return <>{children}</>;
}
