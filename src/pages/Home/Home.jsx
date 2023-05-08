import React, {useState, useEffect} from 'react'
import Banner from '../../components/Banner/Banner'
import NavBar from '../../components/navBar/NavBar'
import RowPost from '../../components/RowPost/RowPost'
import PostContent from '../../components/PostContent/PostContent'
import Footer from '../../components/Footer/Footer'
import axios from '../../axios/userAxios';
function Home() {

  const [homePost,setHomePost] = useState([]);
  useEffect(() => {
  axios.get('/users/getPosts').then(response => {
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
      <Footer/>
    </div>
  )
}

export default Home
