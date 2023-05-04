import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiFillMessage } from "react-icons/ai";
import axios from '../../axios/userAxios';
import { useSelector } from 'react-redux';
import { URL } from '../../constance/constance';

const Follow = ({ pos }) => {
  const [follow, setFollow] = useState(false);
  const [count, setCount] = useState(0);
  const [hide, setHide] = useState(true);

  const { userDetails } = useSelector((state) => state.user);

  const handleHide = () => {
    setHide(!hide);
  };

  const hidebar = () => {
    setHide(!hide);
  };

  useEffect(() => {
    fetch(
      `${URL}/user/followersDetails/${userDetails.user._id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Custom-Header": `${pos.details[0]._id}`
        }
      }
    ).then((res) => res.json()).then((data) => {
      if (data.err) {
        console.log(data.err);
      }
      if (data.status) {
        setFollow(true);
        setCount(data.count);
      } else {
        setFollow(false);
        setCount(data.count);
      }
    }).catch((err) => {
      console.log("Oomby");
    })
  }, [count, follow]);

  const followUser = (id) => {
    const userId = userDetails.user._id;
    fetch(`${URL}/user/followUser/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": `${userDetails.user._id}`
      },
      body: JSON.stringify({
        userId,
      })
    }).then((res) => res.json()).then((data) => {
      if (data.err) {
        console.log("Oomby", data.err);
      }
      if (follow) {
        setFollow(false);
      } else {
        setFollow(true);
      }
    }).catch((err) => {
      console.log("Oomby", err);
    })
  }

  return (
    <>
      <div className="sm:w-[5%] md:w-[40%]  mb-auto px-3  pt-3 sticky top-36 right-0 md:border-l-2">
        <div className="hidden md:block ">
          <img
            className="h-28 w-28 rounded-full my-3"
            src={
              pos.details[0].profilePic
                ? pos.details[0].profilePic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />
          <h5
            className="text-lg font-semibold ml-3 cursor-pointer"
          >
            {pos.details[0].userName}
          </h5>
          <p className="text-lg font-semibold ml-3">{count} Followers</p>
          <p className="ml-3">{pos.details[0].bio ? pos.details[0].bio : ""}</p>
          { userDetails.user._id === pos.details[0]._id ? (
            ""
          ) : follow ? (
            <div className='flex'>
                <button
                onClick={() => followUser(pos.details[0]._id)}
                className=" px-4 py-2 my-2 text-[#ef4444] rounded-3xl border-2"
              >
                {" "}
                Unfollow
              </button>
              <AiFillMessage 
              // onClick={() => addToChat(pos.details[0]._id)} 
              className="ml-4 w-8 mt-3 text-pink-400 cursor-pointer h-8" />
            </div>
              
             
            ) : (
              <button
                onClick={() => followUser(pos.details[0]._id)}
                className=" px-4 py-2 my-2 text-white rounded-3xl bg-[#ef4444]"
              >
                {" "}
                Follow
              </button>
          )}
        </div>
        <div onClick={handleHide} className="block md:hidden cursor-pointer w-8 h-8">
          {hide && <AiOutlineMenu size={20} className="" />}
        </div>
        <div
          className={
            !hide
              ? "fixed right-0 top-20 w-[40%] border-l-2 h-screen bg-white ease-in-out duration-700"
              : "hidden"
          }
        >
          <div className="pt-8 pl-4">
            <AiOutlineClose size={20} onClick={hidebar} />
            <img
              className="h-28 w-28 rounded-full my-3 "
              src={
                pos.details[0].profilePic
                  ? pos.details[0].profilePic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
            <h5 className="text-lg font-semibold">{pos.details[0].userName}</h5>
            <p className="text-lg font-semibold">{count} Followers</p>
            <p className="">{pos.details[0].bio ? pos.details[0].bio : ""}</p>
            {userDetails.user._id === pos.details[0]._id ? (
              ""
            ) : follow ? (
              <div className='flex'>
                <button
                onClick={() => followUser(pos.details[0]._id)}
                className=" px-4 py-2 my-2 text-[#ef4444] rounded-3xl border-2"
              >
                {" "}
                Unfollow
              </button>
              <AiFillMessage 
              // onClick={() => addToChat(pos.details[0]._id)} 
              className="ml-4 w-8 mt-3 text-pink-400 cursor-pointer h-8" />
              </div>
              
             
            ) : (
              <button
                onClick={() => followUser(pos.details[0]._id)}
                className=" px-4 py-2 my-2 text-white rounded-3xl bg-[#ef4444]"
              >
                {" "}
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Follow
