import React, { useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from '../../axios/userAxios';

const Filter = ({ setFilter, handleFilter }) => {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('post/getLocation');
        setLocation(response.data.location);
      } catch (error) {
        console.log(error);
      }
    }

    fetchLocation();
  }, [])

  const slideRight = () => {
    let slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider1");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  return (
    <>
      <div className='max-w-[1280px] mx-auto px-4 my-4 relative flex'>
        <MdChevronLeft
          className="opacity-50 cursor-pointer  hover:opacity-100 my-auto"
          onClick={slideLeft}
          size={20}
        />
        <div id='slider1' className='flex w-[95%] overflow-scroll scrollbar-hide scroll-smooth mx-auto'  >
          <p className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]' onClick={() => handleFilter("all")}>
            All
          </p>
          {location?.map((opt, i) => {
            return (
              <p key={i} className='uppercase m-1 py-1 px-2 border-2 rounded-2xl hover:text-white cursor-pointer text-sm hover:bg-[#525252]' onClick={() => handleFilter(opt.name)}>
                {opt.name}
              </p>
            )
          })}
        </div>
        <MdChevronRight
          className="cursor-pointer opacity-50 hover:opacity-100 my-auto"
          onClick={slideRight}
          size={20}
        />
      </div>
    </>
  )
}

export default Filter
