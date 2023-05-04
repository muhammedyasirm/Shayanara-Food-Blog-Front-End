import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import RecipeForm from '../../components/AdminRecipe/RecipeAdd'

const AdminAddRecipe = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className='py-24 p-5 md:p-32 md:ml-40'>
      <RecipeForm/>
      </div>
    </div>
  )
}

export default AdminAddRecipe
