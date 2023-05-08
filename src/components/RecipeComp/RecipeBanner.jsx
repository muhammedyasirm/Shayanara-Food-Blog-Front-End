import React from 'react';
import useRazorpay from 'react-razorpay';
import axios from '../../axios/userAxios';
import { setUserDetails } from '../../Redux/Features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { razorpayId } from '../../constance/constance'

const RecipeBanner = () => {

    const { userDetails } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const Razorpay = useRazorpay();

    const standardplan = (price) => {
        axios.post('/user/premium', { price: price }).then((res) => {
            if (res.status === 200) {
                const options = {
                    key: razorpayId,
                    amount: price * 100,
                    currency: "INR",
                    name: "Shayanara",
                    description: "Test Transaction",
                    image: "https://example.com/your_logo",
                    order_id: res.data.order.id,
                    handler: function (response) {
                        verifyPayment(response, res.data);
                    },
                    prefill: {
                        name: "Shayanara",
                        email: "shayanara@gmail.com",
                        contact: "9999999999",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    }
                }
                const rzp1 = new Razorpay(options);
                rzp1.on("payment.failed", function () {
                    toast.success(
                        'Payment Failed',
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
                    // navigate("/profile");
                });
                rzp1.open();
            }
        })
    }

    const verifyPayment = (payment,details) => {
        axios.post('/user/verifyPayment', {payment,details}).then((result) => {
            console.log(result, "from then");
            if(result.data.err) {
                console.log("Error payment",result.data.err);
            } else if (result.data.proPremium){
                dispatch(setUserDetails(result.data))
                toast.success(
                    'Successfully completed payment',
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
        }).catch((err) => {
            console.log(err, "from payment")
        })
    }

    return (
        <div className='w-full  bg-white flex-col justify-between'>
            <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                    <p className='text-2xl'> EXTRAORDINARY TASTE AND EXPERIENCE</p>
                    <h1 className='py-3 text-5xl md:text-7xl font-bold'>BEST FOOD FOR YOUR LIFE</h1>
                    <p className='text-2xl'>FIND BEST RECIPE FOR COOKING</p>
                    {userDetails.user.premium === true ? "" 
                    : <button className='text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md py-3 px-6 sm:w-[60%] my-4' onClick={() => standardplan(899)}>Get Premium</button>
                }
                    
                </div>
                <div>
                    <img className='w-full' src='/RecipeBanner.jpg' alt="Image" />
                </div>
            </div>
        </div>
    )
}

export default RecipeBanner
