import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { deleteHistory, fetchChartHistory } from '../features/history/historySlice'


const History = () => {
    const dispatch = useDispatch()
    const { history, loading, error } = useSelector(state => state.history)

    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(fetchChartHistory());
    }, [dispatch])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this chart?')) {
            dispatch(deleteHistory({id , token}))
        }
    }


  return (
    <div className='bg-amber-200'>
        <div className="p-4">
            <h1 className='text-xl' >Chart History</h1>
            {error && <p className='text-red-500' >{error}</p> }
        </div>
        {loading ? (<p>Loading History...</p>) : (
            <div className="w-full overflow-x-scroll md:overflow-hidden">
                <table className='w-full table-auto border-collapse text-sm'>
                <thead>
                    <tr>
                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left' >Title</th>
                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>Size</th>
                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>CreateAt</th>
                    <th className='border-b p-4 pt-0 pb-3 pl-8 text-left'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((chart) => ( 
                        <tr key={chart._id}>
                            <td className='p-4 pl-8 text-gray-500  dark:text-gray-400'>{chart.title}</td>
                            <td className='p-4 pl-8 text-gray-500 dark:text-gray-400'>{(chart.fileSize /1024).toFixed(1)} KB</td>
                            <td className=' p-4 pl-8 text-gray-500 dark:text-gray-400'>{new Date(chart.createdAt).toLocaleString()}</td>
                            <td className='flex gap-2 p-4 pl-8 text-gray-500 dark:text-gray-400'>
                                <button className='text-white'>View</button>
                                <button className='text-red-600 cursor-pointer' onClick={() => handleDelete(chart._id )} >Delete</button>
                            </td>
                        </tr>
                    )) 
                    }
                </tbody>
                </table>
            </div>
        )}
      
    </div>
  )
}

export default History
