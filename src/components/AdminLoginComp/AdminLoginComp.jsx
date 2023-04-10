import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../axios/adminAxios';

function AdminLoginComp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    function adminLogin() {
        if (!email || !password) {
            setErrMsg("Empty values are not allowed")
        }
        if (!errMsg) {
            axios.post('/admin/login', { email, password }).then((res) => {
                if (res.data.err) {
                    setErrMsg(res.data.err)
                } else if (res.data.logged) {
                    localStorage.setItem("admin_token", res.data.token);
                    console.log(res.data.token);
                    navigate('/admin/dashboard')
                    // onClose();
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

    return (
        <>
            <div className='max-w[1280px] mx-auto px-4 pt-3 relative flex justify-between items-center'>
                <div className='mx-auto pt-12bg-[#fbcfe8] text-center rounded-md'>
                    <h3 className='text-[30px] font-bold'>Login as Admin</h3>
                    <div className='text-left py-4'>
                        <form >
                            <div className="text-[#b91c1c] text-center" id="err">
                                {errMsg}
                            </div>
                            <label className="px-8 mb-3">
                                Email <br />
                                <input
                                    className="ml-8 h-8 pl-2 border"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Email"
                                />
                            </label>
                            <br />
                            <label className="px-8 mt-2 ">
                                Password
                                <br />
                                <input
                                    className="ml-8 h-8 pl-2 border"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </label>
                            <br />
                        </form>
                    </div>
                    <button
                        className="bg-[#22c55e] mt-4 mb-12 px-4 py-1 text-white rounded-md"
                        onClick={adminLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminLoginComp
