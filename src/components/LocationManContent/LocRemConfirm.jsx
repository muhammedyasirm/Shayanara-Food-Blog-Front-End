import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineClose } from 'react-icons/ai';
import axios from '../../axios/adminAxios';


const Register_style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "30rem",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#FFF",
    padding: "50px",
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


function LocRemConfirm({ open, onClose, id }) {

    const handleDelete = async() => {
        try {
            await axios.delete(`/admin/deleteLocation/${id}`);
            onClose();
            toast.success("Location Deleted", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            console.log(error)
        }
    }

    if (!open) return null;
    return (
        <>
            <div style={overlay_style} onClick={onClose} />
            <div style={Register_style} className='grid content-center rounded-md'>
                <AiOutlineClose className="ml-auto w-5 h-5 cursor-pointer"
                    onClick={onClose} />
                <h3 className="text-center py-4 text-[24px] font-bold">
                    Confirm Delete
                </h3>
                <div className="flex justify-center">
                    <p>
                        Are you sure to <span className="px-1 text-[#dc2626]">Delete </span>
                         ?
                    </p>
                </div>
                <div className="flex mx-auto">
                    <button
                        className="bg-[#22c55e] px-3 rounded-md py-1 mt-3 mx-1 text-white"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-[#dc2626] rounded-md px-6 py-1 mt-3 mx-1 text-white"
                        onClick={handleDelete}
                    >
                        Sure
                    </button>
                </div>
            </div>
        </>
    )
}

export default LocRemConfirm


