import React from 'react'
import AdminReport from '../../components/AdminReport/AdminReport'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'

const ReportPage = () => {
  
  return (
    <>
      <AdminNavbar/>
      <div className='py-24 p-5 md:p-32 md:ml-40'>
      <AdminReport/>
    </div>
    </>
  )
}

export default ReportPage
