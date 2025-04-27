import React from 'react'

const ViewStates = () => {
  return (
    <div>ViewStates
        <h1 className='text-2xl font-bold'>View States</h1>
        <div className='flex flex-col'>
            <div className='flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md mb-4'>
            <div className='flex items-center'>
                <span className='text-lg font-semibold'>State 1</span>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>View</button>
            </div>
            <div className='flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md mb-4'>
            <div className='flex items-center'>
                <span className='text-lg font-semibold'>State 2</span>
            </div>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg'>View</button>
            </div>
        </div>
    </div>
  )
}

export default ViewStates