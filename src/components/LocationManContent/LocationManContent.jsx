import React, { useState, useEffect } from 'react';
import NewLocation from './NewLocation';
import LocRemConfirm from './LocRemConfirm';
import axios from '../../axios/adminAxios';
import { toast } from 'react-toastify';


const LocationManContent = () => {
    const [location, setLocation] = useState(false);
    const [getLocation, setGetLocation] = useState([]);
    const [confirm, setConfirm] = useState(false);
    const [deletes, setDeletes] = useState("");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get('admin/getLocation');
                setGetLocation(response.data.location);
            } catch (error) {
                console.log(error);
            }
        }

        fetchLocation();
    })


    return (
        <>
            <div className='w-80% text-center p-4 h-[700px] overflow-scroll scrollbar-hide'>
                <div id='success' className='bg-[#86efac] my-2'></div>
                <div className='text-left'>
                    <button
                        className="px-3 py-2 mb-3 bg-[#1d4ed8] text-white rounded-md "
                        onClick={() => setLocation(true)}
                    >
                        Add Location
                    </button>
                </div>
                <NewLocation open={location} onClose={() => setLocation(false)} />
                <table className="border-separate border border-slate-400 ">
                    <thead>
                        <tr>
                            <th className="border border-slate-300 px-4 ">SI No</th>
                            <th className="border border-slate-300  px-4">Location</th>
                            <th className="border border-slate-300 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getLocation && getLocation.map((locations, index) => (
                            <tr key={index}>
                                <td className='border border-slate-300  px-4'>{index + 1}</td>
                                <td className='border border-slate-300  px-4'>{locations.name}</td>
                                <td className="border border-slate-300  px-4">
                                    <button
                                        className="border-2 border-rose-600 px-2 rounded-md text-[#dc2626] hover:bg-[#dc2626] hover:text-white"
                                        onClick={() => {setConfirm(true); setDeletes(locations._id)}}
                                    >
                                        Delete
                                    </button>
                                    <LocRemConfirm
                                        open={confirm}
                                        onClose={() => setConfirm(false)}
                                        id={deletes}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LocationManContent
