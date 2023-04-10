import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import UserManage from '../../components/UserManage/UserManage'

function AdminUser() {
  return (
    <>
    <AdminNavbar/>
    <div className='py-24 p-5 md:p-32 md:ml-40'>
        <UserManage/>
    </div>
    </>
  )
}

export default AdminUser
