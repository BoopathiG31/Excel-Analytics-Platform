import React from 'react'

const Card = ({title,value, growth,icon}) => {
  return (
    <div className='max-w-sm w-full bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500 rounded-xl shadow-md p-5'>
        <div className="flex items-center justify-between mb-2">
            <h4 className='text-medium  md:text-xl text-white'>{title}</h4>
            {icon}
        </div>
        <h2 className=' text-2xl sm:text-4xl font-bold text-white'>{value}</h2>
        <p className="md:text-xs text-green-400 mt-2">
            {growth} from last month
        </p>
    </div>
  )
}

export default Card
