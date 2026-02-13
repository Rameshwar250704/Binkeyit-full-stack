import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const AdminPermission = ({ children }) => {

  const user = useSelector((state) => state.user)

  if (!user) {
    return <p className="text-red-700">User not logged in</p>
  }

  return (
    <>
      {
        isAdmin(user.role)
          ? children
          : <p className="text-red-700">You do not have permission</p>
      }
    </>
  )
}

export default AdminPermission
