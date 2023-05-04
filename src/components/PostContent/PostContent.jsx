import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

function PostContent({ homePost }) {

  const navigate = useNavigate();

  const goPost = () => {
    navigate('/user/post')
  }

  const singlePost = (id) => {
    navigate(`/user/singlePost/${id}`);
  };


  return (
    <>
      {homePost?.slice(0, 2).map((post, i) => {
        {
          return (
            // <div className='flex justify-center' key={i}>
            <div key={i} className="max-w-[100%] mx-auto px-20 py-6 relative justify-center flex flex-col sm:flex-row items-center">
              <div className="sm:w-[50%] md:w-[80%] border-b-2">
                <div className="flex p-1">
                  <img
                    className="h-6 w-6 mt-1 m-2 rounded-full"
                    src={post.userDetails.profilePic ? post.userDetails.profilePic : "/foodblogLogo.jpg"} alt='/'
                  />
                  {post.userDetails.fullName}
                </div>
                <h3
                  className="font-medium text-lg uppercase cursor-pointer flex"
                  onClick={() => { singlePost(post._id) }}
                >
                  {post.foodName}
                </h3>
                <div className="flex">
                  <p className="text-[24px] font-semibold">{post.resName}</p>
                  <p className="border rounded-xl mx-2 my-3 text-[#dc2626] font-medium px-1 text-[10px]">
                    Restaurant
                  </p>
                </div>
                <div className='flex flex-col sm:flex-row '>
                  <p className='w-[80%]'>{post.desc}</p>
                  <div className="sm:w-[50%] md:w-[30%] lg:w-[50%] ml-3 ">
                    <img
                      className="w-48 sm:h-28 md:h-32 px-auto rounded-md "
                      src={
                        post.images
                          ? post.images.url
                          : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
                      } alt='/'
                    />
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="flex">
                    <p className="pt-1 text-sm">{format(post.updatedAt)}</p>
                    <BsFillStarFill className="ml-4 mt-2 w-3 h-3 text-[#f59e0b]" />
                    <p className="pt-1 text-sm pl-1">{post.rating}</p>
                  </div>
                </div>
              </div>

            </div>
            // </div>
          );
        }
      })}
      <div className='flex justify-center'>
        <button onClick={goPost} className=" bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-8 border border-gray-400 rounded shadow mb-5">
          See More....
        </button>
      </div>
    </>
  )
}

export default PostContent
