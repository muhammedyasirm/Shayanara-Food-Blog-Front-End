import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios/adminAxios';

function UserManage() {
    const [users, setUsers] = useState([]);
  const [value, setValue] = useState(true);

  const fetchUsers = useCallback(() => {
    axios.get('/admin/getusers').then((res) => {
      console.log(res);
      if (res.data.userdata) {
        setUsers(res.data.userdata);
      }
    });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, value]);

  const handleBlock = useCallback(
    (id) => {
      console.log(id);
      axios.get(`/admin/blockUser/${id}`).then(() => {
        setValue((prevValue) => !prevValue);
      });
    },
    [setValue]
  );

    

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        {/* {view && <UserView id={id} />} */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,i) => {
              return (
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={i}>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.image ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.image}
                        alt="user profile"
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/foodblogLogo.jpg"
                        alt="user profile"
                      />
                    )}
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.fullName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.phone}</td>
                  {user.isBlocked === false ? (
                    <td className="px-6 py-4">Not Blocked</td>
                  ) : (
                    <td className="px-6 py-4"> Blocked</td>
                  )}
                  
                  <td className="py-4">
                    {user.isBlocked === true ? (
                         <button
                         className=" ml-8 rounded-full hover:border-2 hover:bg-green-500  hover:border-green-500  p-2"
                         onClick={() => {
                           handleBlock(user._id);
                         }}
                       >
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                           />
                         </svg>
                       </button>
                    ) : (
                        <button
                        className="rounded-full ml-8 hover:border-2 hover:bg-red-500  hover:border-red-500  p-2"
                        onClick={() => {
                          handleBlock(user._id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserManage
