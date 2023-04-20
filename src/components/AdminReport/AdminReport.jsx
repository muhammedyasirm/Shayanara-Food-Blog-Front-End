import { Button } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react';
import axios from '../../axios/adminAxios';
import { useNavigate } from 'react-router-dom';

const AdminReport = () => {

    const [reports, setReports] = useState([])

    const fetchReports = useCallback(() => {
        axios.get('/admin/getReports').then((res) => {
            console.log("Reporttt", res);
            if (res.data.data) {
                setReports(res.data.data);
            }
        })
    }, []);

    useMemo(() => {
        fetchReports();
    }, [fetchReports])

    const navigate = useNavigate();

    const goSingleReport = (id,rid) => {
        navigate(`/admin/reportSingle/${id}/${rid}`);
    }

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Reported By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Report
                            </th>
                            <th scope="col" className="px-6 py-3">
                                View And Do The Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => {
                            return (
                                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600" key={report._id}>
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
                                                {report.reportedUser}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">{report.report}</td>

                                    <td className="py-4 flex justify-center">
                                        <Button colorScheme='teal' size='sm' onClick={()=>goSingleReport(report.postId,report._id)}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default AdminReport
