import React from 'react'
import Card from '../components/Card'
import { useSelector } from 'react-redux'
import RecentFiles from '../components/recentFiles';

const Dashboard = () => {

  const stats = useSelector((state) => state.cardstats.stats);
  
  return (
    <div>
        <div className="mx-auto">
            <div className='mx-auto flex flex-col m-2 w-full'>
                <h1 className= 'text-sm sm:text-2xl font-semibold'>Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4 p-5 rounded">
                        {stats.map((stat, idx) => 
                            <Card
                            key={idx}
                            title={stat.title}
                            value={stat.value}
                            growth={stat.growth}
                            icon={stat.icon}
                            />
                        )}
                </div>
                <div>
                    <RecentFiles/>
                </div>
            </div>
        </div>
    </div>
    
    
  )
}

export default Dashboard

