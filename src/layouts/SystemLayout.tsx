import React from 'react'
import { Outlet } from 'react-router-dom'

export const SystemLayout = () => {
  return (
    <div>
      System layout
      <Outlet />
    </div>
  )
}
