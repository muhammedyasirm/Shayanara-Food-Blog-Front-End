import React, { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { MdDelete } from "react-icons/md";
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import DeletePost from './DeletePost';

const YourPost = ({ yourPosts }) => {


    const { userDetails } = useSelector((state) => state.user);
    const [deletePost, setDeletePost] = useState(false);
    const [postId, setPostId] = useState()

    const handleDelete = (id) => {
        setDeletePost(true);
        setPostId(id);
    }

    return (
        <>
            <div className='flex justify-center mt-3'>
                <h3 class="mt-0 mb-2 text-3xl font-medium leading-tight text-primary">
                    Your Posts
                </h3>
            </div>
            {yourPosts.length > 0 && yourPosts.map((post, i) => {
                
                    return (
                        // <div className='flex justify-center' key={i}>
                        <div key={i} className="max-w-[100%] mx-auto px-20 py-6 relative justify-center flex flex-col sm:flex-row items-center">

                            <div className="sm:w-[50%] md:w-[80%] border-b-2">
                                <div className='flex justify-between'>
                                    <div className="flex p-1">
                                        <img
                                            className="h-6 w-6 mt-1 m-2 rounded-full"
                                            src={userDetails.user.profilePic ? userDetails.user.profilePic : "/foodblogLogo.jpg"}
                                            alt='/'
                                        />
                                        {userDetails.user.fullName}
                                    </div>
                                    <div>
                                        <div className=" w-16 h- absolute  rounded-lg flex  opacity-5 hover:opacity-100 scale-110 ease-in-out duration-300">
                                            <MdDelete
                                                className="w-8 h-8 mt-1 cursor-pointer"
                                                onClick={() => handleDelete(post._id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h3
                                    className="font-medium text-lg uppercase cursor-pointer flex"
                                >
                                    {post.foodName}
                                </h3>
                                <div className="flex">
                                    <p className="text-[24px] font-semibold">{post.resName}</p>
                                    <p className="border rounded-xl mx-2 my-3 text-[#dc2626] font-medium px-1 text-[10px]">
                                        Restaurant
                                    </p>
                                </div>
                                <div className='flex flex-col sm:flex-row'>
                                    <p className='w-[80%]'>{post.desc}</p>
                                    <div className="sm:w-[50%] md:w-[30%] lg:w-[50%] ml-3 ">
                                        <img
                                            className="w-48 sm:h-28 md:h-32 px-auto rounded-md "
                                            src={
                                                post.images
                                                    ? post.images.url
                                                    : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                                            } alt='/'
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <div className="flex">
                                        <p className="pt-1 text-sm">{format(post.updatedAt)}</p>
                                        <BsFillStarFill className="ml-4 mt-2 w-3 h-3 text-[#f59e0b]" />
                                        <p className="pt-1 text-sm pl-1">{post.rating}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        // </div>
                    );
                
            })}
            <DeletePost
            open = { deletePost }
            id = { postId }
            onClose={() => setDeletePost(false)}
            />
            {
                yourPosts.length <= 0 &&
                <div className='flex justify-center mt-3'>
                    <h3 class="mt-0 mb-20 text-3xl font-medium leading-tight text-primary text-red-700">
                        You didn't post anything yet!!
                    </h3>
                </div>
            }
        </>
    )
}

export default YourPost
