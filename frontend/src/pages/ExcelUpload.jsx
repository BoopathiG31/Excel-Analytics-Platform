import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { LuFileUp } from "react-icons/lu";
import {useDispatch, useSelector} from 'react-redux';
import { excelUpload, fetchExcelFile } from '../features/excel/excelSlice';
import ChartAnalysis from '../components/ExcelAnalysisChart/ChartAnalysis'

const ExcelUpload = () => {

    const dispatch = useDispatch();

    const {files, loading, error} = useSelector((state) => state.excel);

    const [file, setFile] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchExcelFile());
    }, [dispatch]);



    const handleUpload = () => {
        if (!file) return;
        dispatch(excelUpload(file)).then(()=> {
            dispatch(fetchExcelFile());
        });
    };

  return (
    <>
        <div className='m-2'>
            <div className="mx-auto">
                <h2 className='text-gray-950 text-md font-semibold'>My Files & Assets</h2>
                <div className="flex flex-col items-center border-2 border-gray-950 bg-white/30 backdrop-blur-md rounded-2xl mt-2 p-4">
                    <LuFileUp className='text-gray-950 size-12'/>
                    <div className=''>
                        <label htmlFor="excel-input" className='text-yellow-500 text-xl cursor-pointer'>
                            Click here
                        </label>
                        <span> to upload your file or drag.</span>
                        <input 
                            type="file"
                            id='excel-input'
                            accept='.xlsx, .xls'
                            onChange={(e) => setFile(e.target.files[0])}
                            className='hidden'
                        />
                    </div>
                    <div>
                        { file ? ( <span className='text-sm text-green-500' > ({file.name}) </span>) : (" ")}
                        <button className='bg-gray-950 text-white rounded px-2 py-1 cursor-pointer active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all' onClick={handleUpload}>Upload</button>
                    </div>
                    <p className='text-sm text-gray-500 mt-2'>
                        Supported Format: XLSX, XLS ( 10MB each )
                    </p>
                </div>
                <div className='my-4'>
                    <ChartAnalysis/>
                </div>
                {/* Table Control */}
                <div className="md:flex items-center gap-4 mt-6">
                    <div className="mx-auto flex flex-col">
                        <h2 className='font-semibold text-lg'>Attached Files <span className='text-indigo-900 bg-indigo-100 p-1 rounded-xl'>{files.lengh}</span></h2>
                        <p className='text-gray-400 text-sm'>Here you can explore your uploaded files.</p>
                    </div>
                    
                    <div className="hidden md:flex justify-end flex-1 gap-2 mt-2">
                        <div className="flex justify-center items-center  flex-1 m-2 max-w-xl border-1 border-gray-950 rounded-xl">
                            <input   
                            type="text"
                            placeholder='Search...'
                            className='w-full px-2 py-2 rounded border-0 outline-0'
                            onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className='cursor-pointer'>
                                <CiSearch className='size-6 pl-2'/>
                            </button> 
                        </div>
                        
                    </div>
                    
                </div>

                {loading ? ( <p className=''>Loading...</p>) : error ? ( <p className='text-red-500'>Error: {error}</p>) : (
                    <div className="my-8 w-full overflow-x-scroll md:overflow-hidden bg-amber-200 p-4">
                        <table className="w-full table-auto border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>File Name</th>
                                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>Size</th>
                                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>Uploaded At</th>
                                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>Analysis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.filter((file) => {
                                    return search === "" ? file : file.fileName.toLowerCase().includes(search.toLowerCase())
                                    }).map((file) => ( 
                                    <tr key={file._id}> 
                                        <td className='border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>{file.fileName}</td>
                                        <td className='border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>{(file.size /1024).toFixed(1)} KB</td>
                                        <td className='border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>{file.uploadedAt}</td>
                                        <td className='border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'>Analysis</td>
                                    </tr> 
                                ))}
                            </tbody>
                        </table>
                    </div>  
                )}
            </div>
        </div>
        
    </>
  )
}

export default ExcelUpload

