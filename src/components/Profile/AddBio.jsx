import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/Features/userSlice';

const Register_style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "30rem",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    padding: "5rem",
    zIndex: 1000
};

const overlay_style = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb( 0, 0, 0, .7 )",
    zIndex: 1000
};

const AddBio = ({onClose, open ,id}) => {

    const [bio, setBio] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const dispatch = useDispatch();

    const validate = () => {
        if (!bio) {
            setErrMsg("Feilds can't Be empty");
        } else {
            setErrMsg("");
        }
    }

    const handleBio = (e) => {
        e.preventDefault();
        validate();
        if (!errMsg) {
            axios.put(`/user/addBio/${id}`, { bio }).then((result) => {
                if(result.data.err) {
                    setErrMsg(result.data.err)
                } else if(result.data.bioAdd) {
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
    if (!open) return null;
    return (
        <>
            <div style={overlay_style} onClick={onclose} />
            <div style={Register_style} className='grid content-center rounded-md'>
                <AiOutlineClose className='ml-auto w-5 h-5 cursor-pointer' onClick={onClose} />
                <h3 className='text-center py-4 text-[24px] font-bold'>Add Bio</h3>
                <form >
                    <div className='text-center z-10 text-[#dc2626]'>{errMsg}</div>
                    <label className='py-1'>
                        Enter your Bio <br />
                        <input
                            className='w-[100%] border-2 h-10'
                            type='text'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </label>
                    <br />
                </form>
                <button
                    className="bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white px-3 py-2 mt-3 "
                    onClick={handleBio}
                >
                    Add Bio
                </button>
            </div>
        </>
    )
}

export default AddBio
