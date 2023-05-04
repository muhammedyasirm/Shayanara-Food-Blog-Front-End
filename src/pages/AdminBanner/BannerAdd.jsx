import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import AddBanner from '../../components/AdminBanner/AddBanner'

const BannerAdd = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className='py-24 p-5 md:p-32 md:ml-40'>
        <AddBanner/>
      </div>
    </div>
  )
}

export default BannerAdd
