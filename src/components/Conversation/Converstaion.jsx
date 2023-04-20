import React from 'react'

const Converstaion = () => {
  return (
    <>
      <div className="follower conversation ">
        <div className='flex'>
        <img
            src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
            alt="Profile"
            className="followerImage rounded-full "
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name mx-2" style={{fontSize: '0.8rem'}}>
            <span className="text-lg font-semibold">Shobin Shaju</span> <br />
            <span className="text-xs" style={{color: "#51e200"}}>online</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Converstaion
