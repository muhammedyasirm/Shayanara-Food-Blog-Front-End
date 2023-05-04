import React from 'react'

const RecipeAbout = () => {
  return (
    <div className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>
            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Trusted by Chefs across the world</h2>
                <p className='text-3xl py-6 text-gray-600'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>
            <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>
                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-6xl font-bold text-indigo-600'>100%</p>
                    <p className='text-gray-400 mt-2'>Success</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-6xl font-bold text-indigo-600'>24/7</p>
                    <p className='text-gray-400 mt-2'>Delivery</p>
                </div>
                <div className='border py-8 rounded-xl shadow-xl'>
                    <p className='text-6xl font-bold text-indigo-600'>100K</p>
                    <p className='text-gray-400 mt-2'>Subscription</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecipeAbout
