import React, {useState, useEffect} from 'react'
import Banner from '../../components/Banner/Banner'
import NavBar from '../../components/navBar/NavBar'
import RowPost from '../../components/RowPost/RowPost'
import PostContent from '../../components/PostContent/PostContent'
import RowRecipe from '../../components/RowRecipe/RowRecipe'
import Footer from '../../components/Footer/Footer'
import axios from '../../axios/userAxios';
function Home() {

  const [homePost,setHomePost] = useState([]);
  useEffect(() => {
  axios.get('/users/getPosts').then(response => {
    console.log("Postundade",response.data.postDatas)
       setHomePost(response.data.postDatas)
  }).catch(error => {
      console.log(error)
  })
}, []);

  return (
    <div>
      <NavBar/>
      <Banner/> 
      <RowPost/>
      <PostContent homePost = { homePost }/>
      <RowRecipe/>
      <Footer/>
    </div>
  )
}

export default Home
