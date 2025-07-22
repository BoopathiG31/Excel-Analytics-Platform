import React, { useEffect } from 'react'
import { TfiViewGrid } from "react-icons/tfi";
import { FiRefreshCcw } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { recentExcelFile } from '../features/excel/excelSlice';

const RecentFiles = () => {

    const dispatch = useDispatch();
    const {files, loading, error} = useSelector(state => state.excel);

    useEffect(() => {
        dispatch(recentExcelFile());
    }, [dispatch]);
  return (
    <>
        <div className='m-2'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold"> Recent Files</h2>
                <div className='flex gap-2'>
                    <TfiViewGrid />
                    <FiRefreshCcw />
                </div>
            </div>
            <div className="flex justify-center">
                {loading && <p>Loading recent files...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && files.length === 0 && <p>No recent files found.</p>}
            </div>
            
            {files.length > 0 && (
                <table className="min-w-full text-left text-sm">
                    <thead className='text-indigo-900 bg-blue-100'>
                        <tr>
                            <th className='py-2' >File Name</th>
                            <th className=''>Size</th>
                            <th className=''>UploadedAt</th>
                            <th className=''>Details</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        {files.map((file) => {
                            <tr key={file._id} className='hover: bg-gray-50'>
                                <td className='py-3'>{ file.fileName }</td>
                                <td className='py-3'>{ file.uploadedAt }</td>
                                <td className='py-3'>{ file.size }</td>
                                <td className='py-3'>Analysis</td>
                            </tr>
                        })}
                    </tbody>
                </table>

            )}
        </div>
    
    </>
    
  )
}

export default RecentFiles
