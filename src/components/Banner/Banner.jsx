import React , {useState} from 'react';
import {MdChevronLeft,MdChevronRight,MdOutlineLocalOffer} from 'react-icons/md';
import {IoFastFoodOutline} from 'react-icons/io5';
import {IoIosRestaurant} from 'react-icons/io';
// import {GoLocation} from 'react-icons/go';
// import {BiBarcodeReader} from 'react-icons/bi';


function Banner() {
    const banners = [
        {
            url: 'https://res.cloudinary.com/dnqylncvu/image/upload/v1673101053/ssb4itxjg79wnpvbeaoj.jpg',
            text: {
                restName: 'Thakkaram',
                foodName: 'Biriyani',
                offer: '50%'
            }
          },
          {
            url: 'https://res.cloudinary.com/dnqylncvu/image/upload/v1674110681/i9cil6xi7p5tbwk7ynrc.jpg',
            text: {
                restName: 'Coffee House',
                foodName: 'Masala Dosa',
                offer: '50%'
            }
          },
          {
            url: 'https://media.istockphoto.com/id/1305452646/photo/biryani.jpg?s=612x612&w=0&k=20&c=qndxBx3hBmx6tCkKPUVd8-V4P3QhH4xAkzjU84KqAx4=',
            text: {
                restName: 'Kuttichira',
                foodName: 'Biriyani',
                offer: '50%'
            }
          },
      
          {
            url: 'https://media.gettyimages.com/id/157615990/photo/lasagna.jpg?s=612x612&w=0&k=20&c=f8o7dygPOgFPnvk8wKtDW2QgmBpACMNPFRQtm7x0u7U=',
            text: {
                restName: 'Shayanara',
                foodName: 'Lasagne',
                offer: '50%'
            }
          },
          {
            url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmlyeWFuaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
            text: {
                restName: 'Paragon',
                foodName: 'Biriyani',
                offer: '50%'
            }
          }
    ];

    const [slide , setSlide] = useState(0);
    const length = banners.length;

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
            {banners.map((banner,index) => {
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
                            <div className='absolute justify-center bg-[#a8a29e] rounded-xl bg-opacity-70 ml-4 sm:ml-28 mt-4 sm:mt-28 py-2 sm:py-6 w-[50%] sm:w-[35%] text-center sm:text-left'>
                                <div className='mx-auto sm:w-[75%]'>
                                    <p className='text-lg md:text-4xl uppercase text-white font-bold flex'>
                                    <IoFastFoodOutline className='md:mt-2 text-[#7f1d1d] mx-2'/>
                                    {banner.text.foodName}
                                    </p>
                                    <p className="text-base md:text-2xl text-white font-semibold flex ">
                                    <IoIosRestaurant className="md:mt-2 text-[#7f1d1d] mx-2" />
                                    {banner.text.restName}
                                    </p>
                                    <p className="text-lg md:text-4xl uppercase text-white font-bold flex ">
                                    <MdOutlineLocalOffer className="md:mt-3 mx-2 text-[#7f1d1d] md:w-8 md:h-8" />
                                    {banner.text.offer} OFF
                                    </p>
                                </div>
                            </div>
                            <img 
                                className='w-full h-80 sm:h-[500px] rounded-lg'
                                src={banner.url}
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
