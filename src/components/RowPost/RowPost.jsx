import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function RowPost() {
    const data = [
        {
          id: 1,
          img: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJpcnlhbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
          item: 'Chicken Tikka'
        },
        {
          id: 2,
          img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
          item: 'Biriyani'
        },
        {
          id: 3,
          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          item: 'Pizza'
        },
        {
          id: 4,
          img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
          item: 'Burger'
        },
        {
          id: 5,
          img: 'https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
          item: 'Chai'
        },
        {
          id: 6,
          img: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2054&q=80',
          item: 'Shawarma'
        },
        {
          id: 7,
          img: 'https://images.unsplash.com/photo-1665206221363-568ea2f7b195?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          item: 'Dosa'
        },
        {
          id: 8,
          img: 'https://images.unsplash.com/photo-1629385697093-57be2cc97fa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80',
          item: 'Ice Cream'
        },
        {
          id: 9,
          img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          item: 'Salad'
        },
        {
          id: 10,
          img: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          item: 'Cakes'
        },
        {
          id: 11,
          img: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80',
          item: 'Nuggets'
        },
        {
          id: 12,
          img: 'https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
          item: 'Lasagne'
        },
      ];

      const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      }

      const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500
      }
  return (
    <>
      <div className="mt-8 text-center">
        <p className="text-lg font-bold mb-5">Select Your Favourite Food</p>
      </div>
      <div className='relative flex items-center'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40}/>
        <div id='slider' className='w-full h-full overflow-x-scroll scroll whitespace-nowrap flex scroll-smooth scrollbar-hide'>
            {data.map((item,i) => (
              <div className='p-2' key={i}>
                <img
                    className='w-[300px] shadow rounded-3xl h-[240px] inline-block cursor-pointer hover:scale-105 ease-in-out duration-300'
                    src={item.img}
                    alt='/'
                />
                 <h6 className="w-80 text-lg font-bold uppercase">{item.item}</h6>
              </div>
                
            ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40}/>
      </div>
    </>
  )
}

export default RowPost
