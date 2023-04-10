import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import ConfirmLogout from '../../ConfirmLogout/ConfirmLogout';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { useNavigate } from 'react-router-dom';


function NavBar() {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav)
  }

  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [log, setLog] = useState(false);
  const [isLoginComp, setIsLoginComp] = useState(false);
  
  const navigate = useNavigate();
  function goProfile() {
      navigate('/user/profile');
  }

  function goHome() {
    navigate('/');
  }

  function goPost () {
    navigate('/user/post');
  }

  return (
    <>
      <div className="flex justify-between sticky top-0 left-0 right-0 z-10 items-center max-w-screen mx-auto px-4 rounded-xl bg-gradient-to-r from-[#e7e5e4] to-[#fee2e2]">
        <div className="text-center ">
          <img
            className="rounded-full mt-2 ms-3 w-24 h-16 cursor-pointer"
            src='/foodblogLogo.jpg' alt='/'
          />
          <h2 className="w-full text-sm ps-3 font-bold text-[#059669] ">
            ShayanaraFoods
          </h2>
        </div>
        <ul className='hidden md:flex'>
          <li className='p-4 cursor-pointer' onClick={goHome}>HOME</li>
          <li className='p-4 cursor-pointer' onClick={goPost}>POSTS</li>
          <li className='p-4 cursor-pointer'>RECIPE</li>
          {token ? (
            <>
              <li className='p-4 cursor-pointer'>CHAT</li>
              <li className='p-4 cursor-pointer' onClick={goProfile}>PROFILE</li>
              <li className='p-4 cursor-pointer' onClick={() => {
                setLog(true)
              }}>LOGOUT</li>
              <ConfirmLogout onClose={() => setLog(false)} open={log} />
            </>
          ) : (
            <>
              <li
                className='p-4 cursor-pointer'
                onClick={() => setIsOpen(true)}
              >
                SIGNUP
              </li>
              <li
                className='p-4 flex cursor-pointer'
                onClick={() => {
                  setIsLoginComp(true);
                }}
              >
                LOGIN</li>
            </>
          )}
          <Signup open={isOpen} onClose={() => setIsOpen(false)} />
          <Login open={isLoginComp} onClose={() => setIsLoginComp(false)} />
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20} className='cursor-pointer' /> : <AiOutlineMenu size={20} className='cursor-pointer' />}
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-900 bg-gradient-to-r from-[#e7e5e4] to-[#fee2e2] flex-col ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <div className="text-center ml-9">
            <img
              className="rounded-full mt-2 ms-3 w-24 h-16 cursor-pointer"
              src='/foodblogLogo.jpg' alt='/'
            />
            <h2 className="w-full text-sm ps-3 font-bold text-[#059669] flex ">
              ShayanaraFoods
            </h2>
          </div>
          <ul className='uppercase p-4 flex-col items-start justify-start'>
            <li className='p-4 flex cursor-pointer border-b border-gray-400' onClick={goHome}>HOME</li>
            <li className='p-4 flex cursor-pointer border-b border-gray-400' onClick={goPost}>POSTS</li>
            <li className='p-4 flex cursor-pointer border-b border-gray-400'>RECIPE</li>
            {token ? (
              <>
                <li className='p-4 flex cursor-pointer border-b border-gray-400'>CHAT</li>
                <li className='p-4 flex cursor-pointer border-b border-gray-400' onClick={goProfile}>PROFILE</li>
                <li className='p-4 flex cursor-pointer border-b border-gray-400'
                  onClick={() => {
                    setLog(true);
                  }}>LOGOUT</li>
                <ConfirmLogout onClose={() => setLog(false)} open={log} />
              </>
            ) : (
              <>
                <li
                  className='p-4 flex cursor-pointer border-b border-gray-400'
                  onClick={() => setIsOpen(true)}
                >
                  SIGNUP
                </li>
                <li
                  className='p-4 flex cursor-pointer border-b border-gray-400'
                  onClick={() => {
                    setIsLoginComp(true);
                  }}
                >
                  LOGIN
                </li>
              </>
            )}

            <Signup open={isOpen} onClose={() => setIsOpen(false)} />
            <Login open={isLoginComp} onClose={() => setIsLoginComp(false)} />
          </ul>
        </div>
      </div>
    </>
  )
}

export default NavBar

