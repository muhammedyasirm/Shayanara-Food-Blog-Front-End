import { Button } from '@chakra-ui/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/adminAxios';
import DeleteBanner from './DeleteBanner';

const AdminBannerManage = () => {

  const [banner, setBanner] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const fetchBanner = useCallback(() => {
    axios.get('/admin/getBanner').then((res) => {
      if (res.data.data) {
        setBanner(res.data.data);
      }
    })
  }, []);

  useMemo(() => {
    fetchBanner();
  }, [fetchBanner]);

  const navigate = useNavigate();

  function goAddBanner() {
    console.log("clicked")
    navigate('/admin/addBanner');
  }
  return (
    <div>
      <div>
        <Button colorScheme='teal' size='md' onClick={goAddBanner}>
          Add Banner
        </Button>
      </div>
      <div className='mt-5'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Banner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Restuarent
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {banner.map((banner) => {
                return (
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={banner._id}>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/foodblogLogo.jpg"
                        alt="user profile"
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {banner.bannerName}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{banner.foodName}</td>

                    <td className="py-4">
                      <Button colorScheme='teal' size='sm' className='flex justify-center'onClick={() => setConfirm(true)} >
                        Delete
                      </Button>
                      <DeleteBanner 
                      open={confirm}
                      onClose={() => setConfirm(false)}
                      id = {banner._id}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminBannerManage
