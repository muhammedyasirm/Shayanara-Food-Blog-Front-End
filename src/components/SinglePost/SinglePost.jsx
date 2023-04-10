import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';

const SinglePost = () => {
    return (
        <>
            <div className="max-w-[1280px] mx-auto px-4 pt-3 relative flex justify-between items-center ">
                <div className="sm:w-[95%] md:w-[60%]">
                    <div className=" flex justify-between">
                        <div className="p-5 flex ">
                            <img
                                className="h-12 w-12 mt-1 rounded-full"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            />
                            <div className="pl-2 pt-2">
                                <h6 className="font-semibold text-md">
                                    Shobin
                                </h6>
                                <p className="text-sm">1 month ago</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-xl font-medium">Biriyani</h3>
                                <h6 className="font-medium">Kuttichira</h6>
                                <div className="flex mt-1">
                                    <h5>4</h5>
                                    <BsFillStarFill className="ml-1 mt-1 w-4 h-4 text-[#f59e0b]" />
                                </div>
                            </div>
                        </div>
                        <img
                            className="rounded-sm w-100 h-100 my-4"
                            src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" />
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                        <img
                            className="rounded-sm w-100 h-100 my-4"
                            src="https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg" />
                        <div className="flex">
                            <p className="text-[24px] font-semibold">Kuttichira</p>
                            <p className="border rounded-xl mx-2 my-3 font-medium px-1 text-[10px] text-[#dc2626]">
                                Restaurant
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-[20px] font-medium">9898787676</p>
                            <p className="border rounded-xl mx-2 my-2 font-medium px-1 text-[10px] text-[#dc2626]">
                                Contact
                            </p>
                        </div>
                        <div className="flex">
                            <p className="text-[20px] font-medium">Calicut</p>
                            <p className="border rounded-xl mx-2 my-2 font-medium px-1 text-[#dc2626] text-[10px] ">
                                Place
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost
