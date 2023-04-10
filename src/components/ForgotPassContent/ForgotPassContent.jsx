import React, {useState} from 'react';
import Otp from '../Otp/Otp';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
 
const ForgotPassContent = () => {

    const [otp, setOtp] = useState(false);
    const [email, setEmail] = useState("");
    const [errMsg, setErrMsg] = useState("");

    function submitEmail(){
        const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email) {
            setErrMsg("Please provide a valid email")
        } else if ( !email.match(regx)) {
            setErrMsg("Enter a valid Email id!");
        } else {
            axios.post('/user/forgotPassword', { email }).then((result) => {
                console.log("Email avde ethi",result);
                if(result.data.err) {
                    setErrMsg("Something went wrong!");
                }
                if(result.data.status === "notFound") {
                    setErrMsg("Email is not found !!! Try with another or Signup");
                } else {
                    setOtp(true);
                    toast.success("An OTP has sended to your Email. Please check it.", {
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
            }) .catch((err) => {
                setErrMsg("Something went wrong");
            });
        }
    }
  return (
    <>
      <div className="mx-auto max-w-[1240px]">
      <div className="w-96 mt-16 mx-auto border shadow text-center rounded-lg bg-[#fff]">
        <p className="text-lg font-bold py-5"> Forgot Password ?</p>
        <p className="pb-2">Do you forgot your Password ?</p>
        <form className="text-left ml-14">
          <div id="scss" className="text-center z-10   text-[#53ec45] "></div>
          <div id="errrr" className="text-[#dc2626] text-center">
            {errMsg}
          </div>
          <label>
            Please provide your Email.
            <br />
            <input
              className="border w-[80%] pl-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email id"
            />
          </label>
          <br />
        </form>
        <button
          className="my-5 rounded-md px-3 py-1 bg-[#fbcfe8] hover:bg-[#db2777] hover:text-white"
          onClick={submitEmail}
        >
          Submit
        </button>
        <Otp
          open={otp}
          email={email}
          forgot={true}
          onClose={() => {
            setOtp(false);
          }}
        />
      </div>
    </div>
    </>
  )
}

export default ForgotPassContent
