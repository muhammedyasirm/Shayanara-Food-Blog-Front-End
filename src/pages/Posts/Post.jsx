import React, {useEffect, useState} from 'react';
import NavBar from '../../components/navBar/NavBar';
import PostContents from '../../components/PostPage/PostContents';
import axios from '../../axios/userAxios';

function Post() {

  // const [postChange, setPostChange] = useState(true);

  const [post,setPost] = useState([]);
        useEffect(() => {
        axios.get('/users/getPosts').then(response => {
          console.log("Postundade",response)
             setPost(response.data.postDatas)
        }).catch(error => {
            console.log(error)
        })
    }, []);

  return (
    <div>
      <NavBar/>
      <PostContents post = {post}/> 
    </div>
  )
}

export default Post
