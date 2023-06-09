import React, {useState, useEffect} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from '../../axios/userAxios';
import ResetPassword from '../ResetPassword/ResetPassword';

const Register_style = {
    position: "fixed",
    width: "30rem",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
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


const Otp = ({
    open,
    email,
    onClose,
    forgot
}) => {
    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(30);
    const [minutes, setMinutes] = useState(1);
    const [errMsg, setErrMsg] = useState("");
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(seconds > 0){
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if(minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds, minutes]);

    async function verifyOTP() {
      if(!otp) {
        setErrMsg("Empty values are not allowed");
      } else {
        axios.post('/user/otpVerify', { email, otp }).then((response) => {
          if(response.data.err) {
            console.log('Something wrong');
          }
          if (response.data.status === "invalid") {
            setErrMsg("Invalid Otp!!!")
          } else if (response.data.status === "expired") {
            setErrMsg("Otp has expired!!!")
          } else if (!forgot){
            onClose();
            toast.success("You are successfully registered. Please Login", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          } else {
            setReset(true);
            toast.success(
              "Verification has done. Please enter new Password",
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
            );
          }
        })
      }
    }

    function resendOtp() {
      axios.post('/user/otpVerify',{ email }).then((res) => {
        if(res.data.err) {
          console.log("Something wrong err");
        }
        if(res.data.status === "ok") {
          setMinutes(1);
          setSeconds(30);
          toast.success(
            "OTP has resended. Check your email.",
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
          );
        }
      }).catch((err)=>{
        console.log("Something wrong errrrr")
      })
    }

    if (!open) return null;
  return (
    <>
      <div style={ overlay_style } />
      <div style={ Register_style }>
        <AiOutlineClose
        className='ml-auto w-5 h-5 cursor-pointer'
        onClick={ onClose }
        />
        <h3 className='text-center py-5 text-[24px] font-bold'>
            Verify OTP
        </h3>
        <form className='w-[100%]'>
            <div id='err' className='text-[#dc2626]'>
                { errMsg }
            </div>
            <label className="py-1 w-[100%]">
            Enter your OTP <br />
            <input
              className="w-[100%] border-2"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </label>
          <br />
          <div className='flex justify-between py-3'>
            {seconds > 0 || minutes > 0 ? (
                <p>
                    Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </p>
            ) : (
                <p>Didn't Recieve OTP?</p>
            )}
            <p
            className='cursor-pointer'
            disabled = { seconds > 0 || minutes > 0}
            style = {
                {color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#dc2626"}
            }
              onClick={resendOtp}
            >
                Resend OTP
            </p>
          </div>
        </form>
        <button
          className="bg-[#22c55e] px-3 py-2 mt-3 text-white"
           onClick={verifyOTP}
        >
          Verify
        </button>
        <ResetPassword
          open={reset}
          email={email}
          onClose={() => {
            setReset(false);
            onClose();
          }}
          />
      </div>
    </>
  )
}

export default Otp
