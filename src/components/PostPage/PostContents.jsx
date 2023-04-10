import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import { format } from 'timeago.js';
import { BsFillStarFill } from 'react-icons/bs';

const PostContents = ({ post }) => {
    const token = localStorage.getItem("token");
    const [filter, setFilter] = useState([]);
    const [filterValue, setFilterValue] = useState("")
    console.log(filter);

    useEffect(() => {
        if (!filterValue) {
            setFilter(post)
        }
    }, [post])

    const handleFilter = (filters) => {
        if (filters === "all") {
            setFilter(post)
        } else {
            setFilterValue(filters)
            setFilter(post.filter((value) => value.address === filters))
        }
    }

    

    console.log("No filter ", filter);


    return (
        <>
            <div className=" max-w-[1280px] mx-auto px-4 my-4 relative flex  justify-center flex-wrap md:flex-nowrap">
                <input
                    className="w-full md:w-[50%] py-1 pl-2 text-lg rounded-xl mb-4 md:mb-0 md:mr-4"
                    type="text"
                    placeholder="Search here for posts"
                />

                {token && (
                    <div className="mt-2 md:mt-0 text-center md:text-left">
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br from-cyan-500 to-blue-500 rounded-md shadow-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 inline-block">
                            Add Post
                        </button>
                    </div>
                )}
            </div>
            <Filter setFilter={setFilter} handleFilter={handleFilter} />

            {filter.length > 0 && filter.map((post, i) => {
                {
                    return (
                        <div key={i} className="max-w-[100%] mx-auto px-20 py-6 relative justify-center flex flex-col sm:flex-row items-center">

                            <div className="sm:w-[50%] md:w-[80%] border-b-2">
                                <div className='flex justify-between'>
                                    <div className="flex p-1">
                                        <img
                                            className="h-6 w-6 mt-1 m-2 rounded-full"
                                            src={post.userDetails.profilePic ? post.userDetails.profilePic : "/foodblogLogo.jpg"}
                                            alt='/'
                                        />
                                        {post.userDetails.fullName}
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
                    );
                }
            })}
            {
                filter.length <= 0 && post.length > 0 &&
                <div className='flex justify-center mt-3'>
                    <h3 class="mt-0 mb-20 text-3xl font-medium leading-tight text-primary text-red-700">
                        No post avalaible on this location
                    </h3>
                </div>
            }
            {
                filter.length <= 0 && post.length <= 0 &&
                <div className='flex justify-center mt-3'>
                    <h3 class="mt-0 mb-20 text-3xl font-medium leading-tight text-primary text-red-700">
                        No Post Available
                    </h3>
                </div>
            }
        </>
    )
}

export default PostContents


