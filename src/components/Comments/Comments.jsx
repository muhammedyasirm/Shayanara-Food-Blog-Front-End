import React, { useEffect, useState } from 'react';
import { format } from "timeago.js";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { URL } from '../../constance/constance';

const Comments = ({ pos, id }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const { userDetails } = useSelector((state) => state.user);
    const user = userDetails.user._id;

    const postComment = (id) => {
        fetch(`${URL}/user/commentPost/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Custom-Header": `${user}`,
            },
            body: JSON.stringify({
                user,
                comment
            })
        }).then((res) => res.json()).then((data) => {
            setComment("");
        }).catch((err) => {
            console.log("Comment postil oomby", err);
        })
    }

    useEffect(() => {
        if (user) {
            fetch(`${URL}/user/postComments/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Custom-Header": `${user}`
                }
            }).then((res) => res.json()).then((data) => {
                setComments(data.data);
            })
        }
    }, [comment]);


    return (
        <>
            <div className="w-100 flex  pt-4">
                <input
                    className="bg-[#f3f4f6] w-[80%] h-12 rounded-2xl pl-3"
                    placeholder="Comment on this post"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <BsArrowRightCircleFill
                    className="w-10 ml-2 mt-1 h-10"
                    onClick={() => postComment(pos._id)}
                />
            </div>
            <div
                className="max-h-96 w-[90%] overflow-scroll scrollbar-hide"
            >
                {comments.map((comment, index) => {
                    return (
                        <div className="bg-[#f3f4f6] rounded-2xl" key={index}>
                            <div className="flex m-5">
                                <img
                                    className="h-5 w-5 rounded-full mt-1"
                                    src={
                                        comment.details[0].profilePic
                                            ? comment.details[0].profilePic
                                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                    }
                                />
                                <p className="pl-2">{comment.details[0].userName}</p>
                            </div>
                            {comment.comment.map((comm, i) => {
                                return (
                                    <div className="mb-3" key={i} >
                                        <p className="text-lg pl-5">{comm}</p>
                                        <p className="text-xs pl-5 pt-1">
                                            {format(comment.createdAt)}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Comments
