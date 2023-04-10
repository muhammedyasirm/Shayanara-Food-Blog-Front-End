import React from 'react';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import LocationManContent from '../../components/LocationManContent/LocationManContent';


const LocationManagement = () => {
  return (
    <div className='flex justify-center'>
      <AdminNavbar/>
      <div className='py-24 p-5 md:p-32 md:ml-40'>
      <LocationManContent/>
      </div>
    </div>
  )
}

export default LocationManagement
