import React from 'react'
import NavBar from '../../components/navBar/NavBar'
import RecipeBanner from '../../components/RecipeComp/RecipeBanner'
import RecipeAbout from '../../components/RecipeComp/RecipeAbout'
import RecipeContent from '../../components/RecipeComp/RecipeContent'
import Footer from '../../components/Footer/Footer'

const Recipe = () => {
  return (
    <>
      <NavBar/>
      <RecipeBanner/>
      <RecipeAbout/>
      <RecipeContent/>
      <Footer/>
    </>
  )
}

export default Recipe
