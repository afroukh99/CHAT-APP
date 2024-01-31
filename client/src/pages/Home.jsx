import React from 'react'
import LeftBar from '../components/LeftBar'




const Home = () => {


  return (
    <div className="bg-gray-100  flex h-screen   justify-center items-center">
      <div className='flex w-[900px] max-sm:w-full h-4/5 shadow-mo  font-lato rounded-lg'>
        <LeftBar />
        <div className="flex-[5] max-sm:hidden flex justify-center items-center bg-gray-50">
          <h1 className='text-2xl text-zinc-700 font-popins font-semibold'>Select a chat to start new conversation</h1>
        </div>
      </div>
    </div>

  )
}

export default Home