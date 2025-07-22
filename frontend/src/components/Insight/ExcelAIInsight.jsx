import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAIInsight } from '../../features/insight/insightSlice';
//import XLSX from 'xlsx';

const ExcelAIInsight = ({ excelData }) => {
    const dispatch = useDispatch();
    const { insight, loading, error } = useSelector((state) => state.aiInsight);

    const [showModal, setShowModal] = useState(true);

    const handleFile = () => {
        dispatch(fetchAIInsight(excelData));
    };

    

  return (
    <div className='p-6 mx-auto flex justify-center items-center'>
        <input 
            type="file"
            accept='.xlsx, .xls' 
            className='mb-4'
            onChange={handleFile}
        />

        {showModal && (<div className="fixed inset-45 bg-yellow-400/40 backdrop-blur-sm  rounded  flex items-center justify-center z-50">
            <div className=" bg-white sm:w-11/12 md:w-2/3 lg:w-1/2 p-6 rounded-xl shadow-xl relative">
                <h2 className="text-lg font-bold mb-3"> AI Insight</h2>
                <p className="text-sm whitespace-pre-wrap"> {insight} </p>
            </div>
            <button className='absolute top-2 right-2 text-white hover:text-white hover:bg-black text-xl' onClick={() => setShowModal(false)} >
                <IoCloseOutline />
            </button>
        </div>)}
    </div>
  )
}

export default ExcelAIInsight

