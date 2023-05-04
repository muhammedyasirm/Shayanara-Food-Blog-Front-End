import React from 'react'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'
import RecipeTable from '../../components/AdminRecipe/RecipeTable'

const Recipes = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className='py-24 p-5 md:p-32 md:ml-40'>
        <RecipeTable/>
      </div>
    </div>
  )
}

export default Recipes
