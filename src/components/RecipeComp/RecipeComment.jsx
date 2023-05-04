import React, { useEffect, useState } from 'react';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import axios from '../../axios/userAxios';
import { useSelector } from 'react-redux';
import { format } from "timeago.js";

const RecipeComment = ({ recipe, id }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const { userDetails } = useSelector((state) => state.user);
    const user = userDetails.user._id;

    const postComment = (id) => {
        axios.post(`/user/postRecipeComment/${id}`, { user, comment }).then((res) => {
            console.log("recipeComment post", res)
            setComment("");
        }).catch((err) => {
            console.log("Oomby", err);
        })
    }

    useEffect(() => {
        if (user) {
            axios.get(`/user/getRecipeComment/${id}`).then((res) => {
                console.log("Response comment",res.data);
                setComments(res.data.data);
            })
        }
    }, [comment])

    console.log("Comments kittiyade", comments);

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
                    onClick={() => postComment(recipe._id)}
                />
            </div>
            <div className="max-h-96 w-[90%] overflow-scroll scrollbar-hide">
                {comments.map((comment, index) => {
                    return (
                        <div className="bg-[#f3f4f6] rounded-2xl" key={index}>
                            <div className="flex m-5">
                                <img
                                    className="h-5 w-5 rounded-full mt-1"
                                    src={
                                        comment.details[0].profilePic
                                        ? comment.details[0].profilePic
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                />
                                <p className="pl-2">{comment.details[0].userName}</p>
                            </div>
                            {comment.comment.map((comm,i) => {
                                return(
                                    <div className="mb-3"  key={i}>
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

export default RecipeComment
