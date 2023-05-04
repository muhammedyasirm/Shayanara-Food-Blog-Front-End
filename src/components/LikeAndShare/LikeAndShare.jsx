import React, { useState, useEffect } from 'react';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { TbMessageReport } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { URL } from '../../constance/constance';
import ReportOnPost from '../ReportOnPost/ReportOnPost';


const LikeAndShare = ({id, postedUser, user1}) => {
  const [like, setLike] = useState(false);
  const [report, setReport] = useState(false);

  const { userDetails } = useSelector((state) => state.user);

  const user  = userDetails.user._id;

  console.log("Posted user" , postedUser);

  useEffect(() => {
    if(user){ 
      fetch(`${URL}/user/getLikeDetails/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${user}`
        }
      }).then((res) => res.json()).then((data) => {
        if(data.err){
          console.log("Oomby",data.err);
        }
        const like = data.likes;
        if(like.length > 0){
          setLike(true);
        } else {
          setLike(false);
        }
      }).catch((err) => {
        console.log("like'l oomby");
      })
    }
  },[like]);

  const likePost = () => {
    if(user) {
      fetch(`${URL}/user/likePost/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${user}`
        },
        body: JSON.stringify({
          user
        })
      }).then((res) => res.json()).then((data) => {
        if (data.status === true) {
          setLike(true);
        } else {
          setLike(false);
        }
      }).catch((err) => {
        console.log("Like cheyyumbo oombi",err);
      })
    }
  }

  return (
    <>
      <div className="flex pr-5">
      {like ? (
        <AiFillLike
          className="w-6 ml-2  h-6 cursor-pointer"
           onClick={likePost}
        />
      ) : (
        <AiOutlineLike
          className="w-6 ml-2  h-6 cursor-pointer"
          onClick={likePost}
        />
      )}
        {user !== user1 ? (
          <TbMessageReport
            onClick={() => setReport(true)}
            className="w-6 ml-2 h-6 cursor-pointer"
          />
        ) : (
          ""
        )}
        <ReportOnPost
        id={id}
        postedUser={postedUser}
        userId={user}
        open={report}
        onClose={() => setReport(false)}
      />
        <IoMdShareAlt className="w-6 ml-2  h-6 cursor-pointer" />
      </div>
    </>
  )
}

export default LikeAndShare
