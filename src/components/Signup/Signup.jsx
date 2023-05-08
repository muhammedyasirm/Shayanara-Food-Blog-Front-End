import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import Otp from '../Otp/Otp';
import { URL } from '../../constance/constance';

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

const Signup = ({ open, onClose }) => {
    // const { signup, error } = useSignup();
    const [otp, setOtp] = useState(false);
    const [userName, setUserName] = useState("")
    const [fullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const RegisterUser = (e) => {
        e.preventDefault();
        const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!userName || !fullName || !email || !phone || !password || !password2) {
            setErrMsg("Empty values are not allowed");
        } else if (userName.length < 6) {
            setErrMsg("User name should be contain more than 5 letters");
        } else if (!email.match(regx)) {
            setErrMsg("Enter a valid email id");
        } else if (phone.length !== 10 || isNaN(phone)) {
            setErrMsg("Enter a valid phone number");
        } else if (password.length < 6 || password.length > 15) {
            setErrMsg("Password must be with in 6 to 15 letters");
        } else if (password !== password2) {
            setErrMsg("Entered passwords are not matching");
        } else {
            axios.post('/user/register', { userName, fullName, email, phone, password }).then((response) => {
            if (response.data.err) {
                console.log("Something wrong")
            }
            if (response.data.status === "emailExist") {
                setErrMsg("Email already exist !!! Try with another");
            } else if (response.data.status === "userExist") {
                setErrMsg("User name already exist !!! Try with another");
            } else if (response.data.status === "err") {
                setErrMsg("Something went wrong!!!");
            } else if (response.data.status === "Success") {
                setOtp(true);
                toast.success(
                    'Otp has sended to your email..',
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
        }) .catch((err) => {
            console.log("Something fishy!!!!",err);
        })
        }
    }
    if (!open) return null;
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
                        <label className='py-1 w-[100%]'>
                            User Name <br />
                            <input
                                type="text"
                                value={userName}
                                className='w-[100%] border-2'
                                onChange={(e) => setUserName(e.target.value)} />
                        </label>
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
                            Email <br />
                            <input
                                type="email"
                                value={email}
                                className='w-[100%] border-2'
                                onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <br />
                        <label className='py-1 w-[100%]'>
                            Phone Number <br />
                            <input
                                type="text"
                                value={phone}
                                className='w-[100%] border-2'
                                onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <br />
                        <label className='py-1 w-[100%]'>
                            Password <br />
                            <input
                                type="password"
                                value={password}
                                className='w-[100%] border-2'
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <br />
                        <label className='py-1 w-[100%]'>
                            Confirm Password <br />
                            <input
                                type="password"
                                value={password2}
                                className='w-[100%] border-2'
                                onChange={(e) => setPassword2(e.target.value)} />
                        </label>
                        <br />
                    </form>
                    <button className='px-3 py-2 mt-3 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white' type='submit' 
                    onClick={RegisterUser}
                    >
                        Submit
                    </button>
                    <Otp open = { otp }
                    email = { email }
                    onClose = { () => {
                        setOtp(false);
                        onClose();
                    } } />
                </div>
            </div>
        </>
    )
}

export default Signup
