import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { GrImage } from "react-icons/gr";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
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

const AddPost = ({ open, id, onClose, changePost }) => {
    const [add, setAdd] = useState(false);
    const [rest, setRest] = useState(false);

    const [foodName, setFoodName] = useState("");
    const [desc, setDesc] = useState("");
    const [rating, setRating] = useState("");
    const [image1, setImage1] = useState("");
    const [resName, setResName] = useState("");
    const [image2, setImage2] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [getLocation, setGetLocation] = useState([]);


    let url1, url2;

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
    },[])

    async function addContent() {
        if (add === false) {
            setAdd(true);
        } else {
            if (image1) {
                const data = new FormData();
                data.append("file", image1);
                data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
                data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

                await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
                    method: "post",
                    body: data
                }).then((res) => res.json())
                    .then((data) => {
                        url1 = data.url
                    }).catch((err) => {
                        console.log(err);
                    });
                setAdd(false);
            } else {
                setAdd(false);
            }
        }
    }

    async function resImage() {
        if (rest === false) {
            setRest(true);
        } else {
            if (image2) {
                const data = new FormData();
                data.append("file", image2);
                data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
                data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

                await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
                    method: "post",
                    body: data
                }).then((res) => res.json()).then((data) => {
                    url2 = data.url;
                }).catch((err) => {
                    console.log(err)
                });
                setRest(false);
            } else {
                setRest(false)
            }
        }
    }


    async function storePost() {
        if (!foodName || !desc || !rating || !resName) {
            setErrMsg("Fields cannot be empty");
        } else if (foodName.length < 3) {
            setErrMsg("Enter food name with atleast 3 letters");
        } else if (desc.length < 20) {
            setErrMsg("Description must be more than 20 words");
        } else if (rating > 5 || isNaN(rating)) {
            setErrMsg("Enter a valid rating for the food");
        } else {
            if (contact.length !== 10 || isNaN(contact)) {
                return setErrMsg("Please enter a valid number to contact");
            }

            if (address.length <= 3) {
                return setErrMsg("Enter a valid address");
            }
            if (image1) {
                 await addContent();
            }
            if (image2) {
               await resImage();
            }
        }

         await axios.post(`/users/addPost/${id}`, {
            foodName,
            desc,
            rating,
            resName,
            contact,
            address,
            url1,
            url2
        })
            .then((response) => {
                console.log("post cheythittund: ", response);
                if(response.err) {
                    console.log(response.err)
                }
                if (response.status === "emptyErr") {
                    setErrMsg("Empty values are not allowed");
                } else {
                    onClose();
                    changePost();
                    toast.success("Post added successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }).catch((err) => {
                console.log(err)
            })

    }
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
                                    onClick={addContent}
                                />
                                <ReactTooltip anchorId="my-element" />
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle
                                    id="my-element2"
                                    data-tooltip-content="Close"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                    onClick={addContent}
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
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                        />
                        <br />
                    </div>
                    <br />
                    <textarea
                        className="w-[70%] ml-14 h-16 focus:outline-none border-none text-[20px]"
                        type="text"
                        placeholder="Write something about the food . . ."
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <br />
                    <input
                        className="w-[70%] ml-14 h-16 focus:outline-none border-none text-[20px]"
                        type="text"
                        placeholder="Give a rating for the food in 5. . ."
                        value={rating}
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
                                    onClick={resImage}
                                />
                                <ReactTooltip anchorId="my-element5" />
                            </>
                        ) : (
                            <>
                                <AiOutlineCloseCircle
                                    id="my-element6"
                                    data-tooltip-content="Close"
                                    className="h-10 w-10 my-auto mr-3 cursor-pointer"
                                    onClick={resImage}
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
                            value={resName}
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
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <br />
                    <p className='text-center'>Select restaurant location</p>
                    <br />
                    <select
                        className="w-[70%] ml-14 mt-2 h-10 rounded-lg focus:outline-none border-none text-[20px]"
                        type="text"

                        value={address}
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
                    data-tooltip-content="Add Post"
                    className=" px-3 py-2 mt-5 mb-8 mx-12 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
                    onClick={storePost}
                >
                    Add Post
                </button>
                <ReactTooltip anchorId="my-element7" />
            </div>
        </>
    )
}

export default AddPost
