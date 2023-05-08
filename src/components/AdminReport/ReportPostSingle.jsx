import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from '../../axios/adminAxios';
import { format } from "timeago.js";
import PostDelete from './PostDelete';
import ReportDelete from './ReportDelete';


const ReportPostSingle = () => {

    const [reportedPost, setReportedPost] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [reportConfirm, setReportConfirm] = useState(false);

    const params = useParams();
    const id = params.id;
    const rid = params.rid;

    useEffect(() => {
        axios.get(`/admin/reportSingle/${id}`).then((res) => {
            setReportedPost(res.data.post);
        })
    }, []);
    return (
        <>
            <div className="max-w-[1280px] mx-auto px-4 pt-3 relative flex justify-between items-center ">
                {reportedPost.map((pos, index) => {
                    return (
                        <>
                            <div className="sm:w-[95%] md:w-[60%]">
                                <div className=" flex justify-between">
                                    <div className="p-5 flex ">
                                        <img
                                            className="h-12 w-12 mt-1 rounded-full"
                                            src={
                                                pos.details[0].profilePic
                                                    ? pos.details[0].profilePic
                                                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            }
                                            alt='/'
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
                                    </div>
                                    <img
                                        className="rounded-sm w-100 h-100 my-4"
                                        src={pos.images
                                            ? pos.images.url
                                            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} alt='/' />
                                    <p>{pos.desc}</p>
                                    <img
                                        className="rounded-sm w-100 h-100 my-4"
                                        src={pos.resImage
                                            ? pos.resImage.url
                                            : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"} alt='/'/>
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
                                <div className='flex mb-3 justify-center'>
                                    <Button mr="3" colorScheme='teal'onClick={() => setConfirm(true)}>Delete Post</Button>
                                    <PostDelete 
                                    open={confirm}
                                    onClose={() => setConfirm(false)}
                                    id={id}
                                    rid={rid}
                                    />
                                    <Button colorScheme='teal' onClick={() => setReportConfirm(true)}>Delete Report</Button>
                                    <ReportDelete
                                    open={reportConfirm}
                                    onClose={() => setReportConfirm}
                                    rid={rid}
                                    />
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ReportPostSingle
