import React, {useState, useEffect} from 'react'; 
import NavBar from '../../components/navBar/NavBar';
import Profile from '../../components/Profile/Profile';
import YourPost from '../../components/Profile/YourPost';
import { useSelector } from 'react-redux';
import axios from '../../axios/userAxios'; 

function UserProfile() {

  const { userDetails } = useSelector((state) => state.user);
  const userId = userDetails.user._id;

  const [post, setPost] = useState(true);

  const [yourPosts,setYourPost] = useState([]);
        useEffect(() => {
        axios.get('/users/getPosts').then(response => {
            setYourPost(response.data.postDatas.filter((posts) => posts.userId === userId))
        }).catch(error => {
            console.log(error)
        })
    }, [post]);

    console.log(yourPosts)


  return (
    <div>
      <NavBar/>
      <Profile setPost = {setPost} post = {post}/>
      <YourPost yourPosts = {yourPosts}/>
    </div>
  )
}

export default UserProfile
