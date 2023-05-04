import React from 'react'
import AdminBannerManage from '../../components/AdminBanner/AdminBannerManage'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'

const BannerManage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className='py-24 p-5 md:p-32 md:ml-40'>
        <AdminBannerManage/>
        </div>
    </div>
  )
}

export default BannerManage
