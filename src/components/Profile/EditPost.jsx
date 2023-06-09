import React, { useEffect, useState } from 'react';
import { GrImage } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from '../../axios/userAxios';
import { toast } from "react-toastify";


const Register_style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "27rem",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    zIndex: 1000,
};

const overlay_style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb( 0, 0, 0, .7 )",
    zIndex: 1000,
};

const EditPost = ({ open, post, onClose, yourPost }) => {

    console.log("Post id kitty", post);

    const [postt, setPost] = useState({});

    const postToEdit = yourPost.find((yourpost) => yourpost._id === post);

    console.log("postToEdit: ",postToEdit);

    useEffect(() => {
        console.log("effecting"); 
        if (postToEdit && postToEdit !== postt) {
            setPost(postToEdit);
        }
    }, [postToEdit, postt])

    const [add, setAdd] = useState(false);
    const [rest, setRest] = useState(false);

    const [foodName, setFoodName] = useState(postt.foodName);
    const [desc, setDesc] = useState(postt.desc);
    const [rating, setRating] = useState(postt.rating);
    const [image1, setImage1] = useState(postt.images);
    const [resName, setResName] = useState(postt.resName);
    const [image2, setImage2] = useState(postt.resImage);
    const [contact, setContact] = useState(postt.contact);
    const [address, setAddress] = useState(postt.address);
    const [errMsg, setErrMsg] = useState("");
    const [getLocation, setGetLocation] = useState([]);


    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get('post/getLocation');
                setGetLocation(response.data.location);
            } catch (error) {
                console.log(error);
            }
        }

        fetchLocation();
    }, [])

    if (!open) return null;
    return (
        <>
            <div style={overlay_style} onClick={onClose} />
            <div
                style={Register_style}
                className="grid content-center h-screen mt-3 rounded-md overflow-y-scroll scrollbar-hide"
            >
                <AiOutlineClose
                    className="ml-auto w-5 h-5 cursor-pointer mt-20 mr-6"
                    onClick={onClose}
                />
                <h2 className="text-center  pb-4 font-bold text-[28px]">ADD A POST</h2>
                <form className="w-[100%] ">
                    <div id="err" className="text-[#dc2626] text-center">
                        {errMsg}
                    </div>
                    <div className="flex  ml-12">
                        {!add ? (
                            <>
                                <AiOutlinePlusCircle
                                    id="my-element"
                                    data-tooltip-content="Add food image"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                // onClick={addContent}
                                />
                                <ReactTooltip anchorId="my-element" />
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle
                                    id="my-element2"
                                    data-tooltip-content="Close"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                // onClick={addContent}
                                />
                                <ReactTooltip anchorId="my-element2" />
                            </>
                        )}
                        {!add ? null : (
                            <div className="fixed bg-white flex ml-16">
                                <label for="foodImg">
                                    <GrImage
                                        className="h-6 w-6 mt-5 ml-2 cursor-pointer"
                                        id="my-element3"
                                        data-tooltip-content="Select image"
                                    />
                                    <input
                                        id="foodImg"
                                        className="w-[82%] border-2 d hidden"
                                        accept="image/png, image/gif, image/jpeg"
                                        type="file"
                                        onChange={(e) => {
                                            setImage1(e.target.files[0]);
                                        }}
                                    />
                                    <ReactTooltip AnchorId="my-element3" />
                                </label>
                                <input
                                    id="foodImg"
                                    className="w-[82%] border-2 d hidden"
                                    accept="image/png, image/gif, image/jpeg"
                                    type="file"
                                    onChange={(e) => {
                                        setImage1(e.target.files[0]);
                                    }}
                                />
                            </div>
                        )}
                        <input
                            className="w-[50%] h-16 focus:outline-none border-none text-[20px]"
                            type="text"
                            placeholder={add ? "" : "Tell your food name . . ."}
                            value={postt.foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                        <br />
                    </div>
                    <br />
                    <textarea
                        className="w-[70%] ml-14 h-16 focus:outline-none border-none text-[20px]"
                        type="text"
                        placeholder="Write something about the food . . ."
                        value={postt.desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <br />
                    <input
                        className="w-[70%] ml-14 h-16 focus:outline-none border-none text-[20px]"
                        type="text"
                        placeholder="Give a rating for the food in 5. . ."
                        value={postt.rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <br />
                    <div className="flex  ml-12">
                        {!rest ? (
                            <>
                                <AiOutlinePlusCircle
                                    id="my-element5"
                                    data-tooltip-content="Add image for Restaurant"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                // onClick={resImage}
                                />
                                <ReactTooltip anchorId="my-element5" />
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle
                                    id="my-element6"
                                    data-tooltip-content="Close"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                // onClick={resImage}
                                />
                                <ReactTooltip anchorId="my-element6" />
                            </>
                        )}
                        {!rest ? null : (
                            <div className="fixed bg-white flex ml-16">
                                <label for="restImg">
                                    <GrImage
                                        id="my-element4"
                                        data-tooltip-content="Add image"
                                        className="h-6 w-6 mt-5 ml-2 cursor-pointer"
                                    />
                                </label>
                                <ReactTooltip anchorId="my-element4" />
                                <input
                                    id="restImg"
                                    className="w-[82%] border-2 d hidden"
                                    accept="image/png, image/gif, image/jpeg"
                                    type="file"
                                    onChange={(e) => {
                                        setImage2(e.target.files[0]);
                                    }}
                                />
                            </div>
                        )}
                        <input
                            className="w-[50%] h-16 focus:outline-none border-none text-[20px]"
                            type="text"
                            placeholder={rest ? "" : "Tell restaurant name"}
                            value={postt.resName}
                            onChange={(e) => setResName(e.target.value)}
                        />
                        <br />
                    </div>
                    <br />
                    <p className='text-center'>(Optional)</p> <br />
                    <input
                        className="w-[70%] ml-14 h-16 focus:outline-none border-none text-[20px]"
                        type="text"
                        placeholder="Contact number of restaurant"
                        value={postt.contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <br />
                    <p className='text-center'>Select restaurant location</p>
                    <br />
                    <select
                        className="w-[70%] ml-14 mt-2 h-10 rounded-lg focus:outline-none border-none text-[20px]"
                        type="text"

                        value={postt.address}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                        {
                            getLocation && getLocation.map((location, i) => {
                                return (
                                    <option key={i}>{location.name}</option>
                                )
                            })
                        }
                    </select>
                </form>
                <button
                    id="my-element7"
                    data-tooltip-content="Edit Post"
                    className=" px-3 py-2 mt-5 mb-8 mx-12 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
                // onClick={storePost}
                >
                    Edit Post
                </button>
                <ReactTooltip anchorId="my-element7" />
            </div>
        </>
    )
}

export default EditPost
