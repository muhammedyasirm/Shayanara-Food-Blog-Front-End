import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../Redux/Features/userSlice';
import Loader from '../Loader/Loader';


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

const Login = ({onClose,open}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        if(!name || !password) {
            setErrMsg("Feilds can't Be empty");
        } else {
            setErrMsg("");
        }
    }

    const handleLogin = (e) => {
        setLoader(true);
        e.preventDefault();
        validate();
        if(!errMsg) {
            axios.post('/user/login', {name, password}).then((result) => {
                if(result?.data?.err) {
                    setLoader(false);
                    setErrMsg(result.data.err)
                } else if (result?.data?.logged) {
                    localStorage.setItem("token",result.data.token);
                    dispatch(setUserDetails(result.data))
                    setLoader(false);
                    onClose();
                    toast.success(
                        'Successfully logged in..',
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
    const forgetPassword = () => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
          navigate("/user/ForgotPassword");
        }, 1000);
      };
    if (loader) return <Loader />;
    if (!open) return null;
    return (
        <>
           <div style={overlay_style} onClick = {onclose}/>
           <div style={Register_style} className = 'grid content-center rounded-md'>
            <AiOutlineClose className='ml-auto w-5 h-5 cursor-pointer' onClick={onClose}/>
            <h3 className='text-center py-4 text-[24px] font-bold'>Login</h3>
            <form >
                <div className='text-center z-10 text-[#dc2626]'>{errMsg}</div>
                <label className='py-1'>
                    User Name or Email <br/>
                    <input 
                    className='w-[100%] border-2'
                    type = 'text'
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                    />
                </label>
                <br/>

                <label className="py-1">
                    Password <br />
                    <input
                    className="w-[100%] border-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <p
                    className="text-[#dc2626] text-center cursor-pointer "
                    onClick={forgetPassword}
                >
                    Forgot Password ?
                </p>
            </form>
            <button
                className="bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white px-3 py-2 mt-3 "
                onClick={handleLogin}
            >
                Login
            </button>
           </div> 
        </>
    )
}

export default Login

