import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import { setUserDetails } from '../../Redux/Features/userSlice';
import { useDispatch } from 'react-redux';

const RegisterStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '30rem',
    transform: 'translate(-50%,-50%)',
    backgroundColor: '#fff',
    padding: '3rem',
    zIndex: 1000
}

const overlay_style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb( 0, 0, 0, .7 )",
    zIndex: 1000,
};

const ProfileEditPage = ({open,onClose}) => {

    const { userDetails } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const [fullName, setFullname] = useState(userDetails.user.fullName);
    const [phone, setPhone] = useState(userDetails.user.phone);
    const [bio, setBio] = useState(userDetails.user.bio);
    const [errMsg, setErrMsg] = useState("");

    const id = userDetails.user._id;
    const editProfile = (e) => {
        e.preventDefault();
        if(!phone || !fullName || !bio){
            setErrMsg("Empty fields are not allowed");
        } else if( isNaN(phone)){
            setErrMsg("Enter a valid phone number");
        } else if(!/^\d{10}$/.test(phone)){
            setErrMsg("Phone must be 10 digit")
        } else {
            axios.put(`/user/editProfile/${id}`, { fullName, phone, bio }).then((result) => {
                if(result.data.err) {
                    setErrMsg(result.data.err)
                } else if(result.data.proEdit) {
                    dispatch(setUserDetails(result.data))
                    onClose();
                    toast.success(
                        'Successfully added bio',
                        {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        }
                    )
                }
            })
        }
    }
    if(!open) return null;
    return (
        <>
            <div style={overlay_style}>
                <div style={RegisterStyle} className='grid content-center rounded-md'>
                    <AiOutlineClose className='ml-auto w-5 h-5 cursor-pointer' onClick={onClose} />
                    <h3 className='text-center py-4 text-[24px] font-bold'>REGISTER</h3>
                    <form className='w-[100%]'>
                        <div id="error" className="text-center  text-[#dc2626] ">
                            {errMsg}
                        </div>
                        <br />
                        <label className='py-1 w-[100%]'>
                            Full Name <br />
                            <input
                                type="text"
                                value={fullName}
                                className='w-[100%] border-2'
                                onChange={(e) => setFullname(e.target.value)} />
                        </label>
                        <br />
                        <label className='py-1 w-[100%]'>
                            Phone Number <br />
                            <input
                                type="number"
                                value={phone}
                                className='w-[100%] border-2'
                                onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <br />
                        <label
                            htmlFor="fullName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Add Your Bio
                        </label>
                        <textarea id="about"
                            name="about"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio} 
                            className='w-[100%] border-2'></textarea>
                    </form>
                    <button className='px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white' type='submit'
                         onClick={editProfile}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProfileEditPage

