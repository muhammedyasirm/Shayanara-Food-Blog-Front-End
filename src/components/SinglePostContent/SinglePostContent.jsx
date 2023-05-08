import React, { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import LikeAndShare from '../LikeAndShare/LikeAndShare';
import { format } from "timeago.js";
import { useParams } from "react-router-dom";
import Comments from '../Comments/Comments';
import Follow from '../Follow/Follow';
import axios from '../../axios/userAxios';

const SinglePost = () => {

    const params = useParams();
    const [post, setPost] = useState([]);

    // console.log(post[0].userId);

    const id = params.id;
    useEffect(() => {
        axios.get(`/users/getSingleView/${id}`).then((res) => {
            setPost(res.data.post);
        })
    }, [])
    return (
        <>
            <div className="max-w-[1280px] mx-auto px-4 pt-3 relative flex justify-between items-center ">
                {post.map((pos, index) => {
                    return (
                        <>
                            <div className="sm:w-[95%] md:w-[60%]" key={index}>
                                <div className=" flex justify-between">
                                    <div className="p-5 flex ">
                                        <img
                                            className="h-12 w-12 mt-1 rounded-full"
                                            src={
                                                pos.details[0].profilePic
                                                    ? pos.details[0].profilePic
                                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            }
                                        />
                                        <div className="pl-2 pt-2">
                                            <h6 className="font-semibold text-md">
                                                {pos.details[0].fullName}
                                            </h6>
                                            <p className="text-sm">{format(pos.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-5">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-xl font-medium">{pos.foodName}</h3>
                                            <h6 className="font-medium">{pos.resName}</h6>
                                            <div className="flex mt-1">
                                                <h5>{pos.rating}</h5>
                                                <BsFillStarFill className="ml-1 mt-1 w-4 h-4 text-[#f59e0b]" />
                                            </div>
                                        </div>
                                        <LikeAndShare 
                                        id={pos._id}
                                        postedUser={pos.details[0]}
                                        user1 = {pos.userId}
                                        />
                                    </div>
                                    <img
                                        className="rounded-sm w-100 h-100 my-4"
                                        src={pos.images
                                            ? pos.images.url
                                            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} />
                                    <p>{pos.desc}</p>
                                    <img
                                        className="rounded-sm w-100 h-100 my-4"
                                        src={pos.resImage
                                            ? pos.resImage.url
                                            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} />
                                    <div className="flex">
                                        <p className="text-[24px] font-semibold">{pos.resName}</p>
                                        <p className="border rounded-xl mx-2 my-3 font-medium px-1 text-[10px] text-[#dc2626]">
                                            Restaurant
                                        </p>
                                    </div>
                                    {pos.contact ? (
                                        <div className="flex">
                                            <p className="text-[20px] font-medium">{pos.contact}</p>
                                            <p className="border rounded-xl mx-2 my-2 font-medium px-1 text-[10px] text-[#dc2626]">
                                                Contact
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    {pos.address ? (
                                        <div className="flex">
                                            <p className="text-[20px] font-medium">{pos.address}</p>
                                            <p className="border rounded-xl mx-2 my-2 font-medium px-1 text-[#dc2626] text-[10px] ">
                                                Place
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <Comments pos={pos} id={id} />
                            </div>
                            <Follow pos = {pos} />
                        </>
                    )
                })}
                {/* <Follow/> */}
            </div>
        </>
    )
}

export default SinglePost
