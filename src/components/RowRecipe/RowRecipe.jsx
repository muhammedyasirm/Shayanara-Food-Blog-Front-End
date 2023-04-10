import React from 'react'

function RowRecipe() {
    const recipeCategory = [
        {
            id: 1,
            img: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJpcnlhbml8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            item: 'Break Fast'
        },
        {
            id: 2,
            img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlyeWFuaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
            item: 'Lunch'
        },
        {
            id: 3,
            img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            item: 'Snacks'
        },
        {
            id: 4,
            img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80',
            item: 'Dinner'
        },
        {
          id: 5,
          img: 'https://images.unsplash.com/photo-1481455473976-c280ae7c10f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
          item: 'Slow Cooker'
        }
    ]
    return (
        <>
            <div className="mt-8 text-center">
                <p className="text-lg font-bold mb-5">Select Your Recipe</p>
            </div>
            <div className='relative flex items-center justify-center'>
                <div id='slider' className='w-full h-full mx-auto overflow-x-scroll scroll whitespace-nowrap flex scroll-smooth scrollbar-hide'>
                    {recipeCategory.map((item,i) => (
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
            </div>
</>
    )
}

export default RowRecipe
