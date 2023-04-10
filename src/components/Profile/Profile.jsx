import React, { useEffect, useState } from "react";
import AddBio from "./AddBio";
import ProfileEditPage from "./ProfileEditPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import { setUserDetails } from '../../Redux/Features/userSlice';
import AddPost from "../AddPost/AddPost";


export default function Profile({setPost, post}) {
  const [isBio, setIsBio] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const dispatch = useDispatch();

 function changePost () {
  setPost(!post);
 }

  function handleImage(e) {
    e.preventDefault();
    let file = new FormData();
    file.append("image", e.target.files[0]);
    axios.post("/user/profileImage", file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((result) => {
      console.log("image add ", result);
      // setUser(res.data.data) 
      dispatch(setUserDetails(result.data))
      toast.success(
        'Successfully added bio',
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      )
    })
  }

  const { userDetails } = useSelector((state) => state.user);



  const followers = userDetails.user.followers.length;
  return (
    <div className="bg-gray-100 ">
      <div className="mx-auto max-w-4xl py-12 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover mt-14 ml-3 md:w-48"
                src={userDetails.user.profilePic ? userDetails.user.profilePic : "/foodblogLogo.jpg"}
                alt="Profile picture"
              />
              <form encType="multipart/form-data" >
                <div className="flex justify-center">
                  <label htmlFor="profile" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                    Change Profile
                    <input type="file"
                      id="profile"
                      name="image"
                      className="hidden"
                      onChange={((e) => handleImage(e))} />
                  </label>
                </div>
              </form>
            </div>
            <div className="p-8 ml-10">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                User
              </div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black uppercase">
                {userDetails.user.fullName}
              </h1>
              <p>{userDetails.user.userName}</p>
              <p>{userDetails.user.email}</p>
              <p>{userDetails.user.phone}</p>
              <div>
                {userDetails.user.bio ? (
                  <div className="mt-2 text-gray-500">
                    {userDetails.user.bio}
                  </div>
                ) : (
                  <button className="mt-5" onClick={() => setIsBio(true)}>Add Bio</button>
                )}
                <AddBio open={isBio} onClose={() => setIsBio(false)} id={userDetails.user._id} />
              </div>
              <div className="mt-6 flex flex-wrap justify-between">
                {/* <div className="w-full md:w-1/3 px-4 py-2">
                  <div className="bg-white rounded-lg shadow-lg py-3">
                    <div className="text-center mb-2">
                      <div className="text-xl font-bold mb-2">Posts</div>
                      <div className="text-gray-800 text-3xl font-semibold">
                        4
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="w-full md:w-2/3 px-4 py-2">
                  <div className="bg-white rounded-lg shadow-lg py-3">
                    <div className="text-center mb-2 ">
                      <div className="text-xl font-bold mb-2">Followers</div>
                      <div className="text-gray-800 text-3xl font-semibold">
                        {followers}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center md:mr-16 md:pr-14">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowEditProfile(true)}>
                  Edit Profile
                </button>
                <ProfileEditPage open={showEditProfile} onClose={() => setShowEditProfile(false)} />
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-4 rounded" onClick={() => setIsPost(true)}>
                  Add Post
                </button>
                <AddPost
                  open={isPost}
                  id={userDetails.user._id}
                  onClose={() => {
                    setIsPost(false);
                  }}
                  changePost = {changePost}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

