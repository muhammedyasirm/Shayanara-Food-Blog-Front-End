import React , {useCallback, useMemo, useState} from 'react';
import {MdChevronLeft,MdChevronRight,MdOutlineLocalOffer} from 'react-icons/md';
import {IoFastFoodOutline} from 'react-icons/io5';
import {IoIosRestaurant} from 'react-icons/io';
import axios from '../../axios/userAxios';


function Banner() {

    const [slide , setSlide] = useState(0);
    const [banner, setBanner] = useState([])
    const length = banner.length;

    const fetchBanner = useCallback(() => {
        axios.get('/admin/getBanner').then((res)=> {
            if(res.data.data) {
                setBanner(res.data.data)
            }
        })
    },[]);

    useMemo(() => {
        fetchBanner();
      }, [fetchBanner]);

    const prevSlide = () => {
        setSlide(slide === length-1 ? 0 : slide + 1);
    };

    const nextSlide = () => {
        setSlide(slide === 0 ? length - 1 : slide - 1);
    };

    // const autoScroll = true;
    // let slideInterval;
    // let intervalTime = 10000;

    // function auto() {
    //     slideInterval = setInterval(nextSlide, intervalTime)
    // }

    // useEffect(() => {
    //     if(autoScroll) {
    //         auto();
    //     }
    //     return () => clearInterval(slideInterval);
    // },[slide, banners]);

    return (
        <>
           <div className='max-w-[1280px] mx-auto px-4 pt-3 relative flex justify-center items-center'>
            <MdChevronRight onClick={nextSlide} 
            size={80} 
            className='absolute top-[45%] text-3xl text-white cursor-pointer right-8' 
            />

            <MdChevronLeft onClick={prevSlide}
            size={80} 
            className='absolute top-[45%] text-3xl text-white cursor-pointer left-8' 
            />
            {banner.map((banner,index) => {
                return(
                    <div className={
                        index === slide
                        ? 'opacity-100 w-full transition duration-1000'
                        : 'opacity-0 transition duration-1000'
                    }
                    key={index}
                    >
                        {index === slide && (
                            <>
                            <div className='absolute justify-center bg-[#a8a29e] rounded-xl bg-opacity-70 ml-4 sm:ml-28 mt-4 sm:mt-28 py-2 sm:py-6 w-[50%] sm:w-[35%] text-center sm:text-left' style={{width: "325px"}}>
                                <div className='mx-auto sm:w-[75%] '>
                                    <p className='text-lg md:text-4xl uppercase text-white font-bold flex'>
                                    <IoFastFoodOutline className='md:mt-2 text-[#7f1d1d] mx-2'/>
                                    {banner.foodName}
                                    </p>
                                    <p className="text-base md:text-2xl text-white font-semibold flex ">
                                    <IoIosRestaurant className="md:mt-2 text-[#7f1d1d] mx-2" />
                                    {banner.hotelName}
                                    </p>
                                    <p className="text-lg md:text-4xl uppercase text-white font-bold flex ">
                                    <MdOutlineLocalOffer className="md:mt-3 mx-2 text-[#7f1d1d] md:w-8 md:h-8" />
                                    {banner.offer} OFF
                                    </p>
                                </div>
                            </div>
                            <img 
                                className='w-full h-[600px] sm:h-[500px] rounded-lg object-cover'
                                src={banner.imageFile.url}
                                alt='/'
                            />
                            </>
                        )}

                    </div>
                )
            })}
            </div> 
        </>
  )
}

export default Banner
