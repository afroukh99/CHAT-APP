import React from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const UpdateForm = ({ setOpenModal, currentUser }) => {
  return (
    <div className="flex font-popins  flex-col gap-4 relative">
      <span onClick={() => setOpenModal(false)} className='absolute cursor-pointer top-[-16px] right-[-8px] font-semibold text-[15px] text-neutral-800'>X</span>
      <h1 className='font-semibold font-popins  text-xl text-center mt-4 text-gray-800'>Update your informations</h1>
      <form className='flex flex-col gap-2' action="">
        <label className='text-gray-700 text-[14px] '
          htmlFor="username">Username</label>
        <input className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          type="text" value={currentUser.username} id='username' name='username' />
        <label className='text-gray-700 text-[14px] '
          htmlFor="email">Email</label>
        <input className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          type="email" value={currentUser.email} id='email' name='email' />
        <label className='text-gray-700 text-[14px] '
          htmlFor="password">Password</label>
        <input value={currentUser.password} className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          type="password" id='password' name='password' />
        <div className="flex gap-3 items-center mt-3 mb-1">
          <label
            className='text-gray-700 text-[13px] cursor-pointer'
            htmlFor="file">
            <img className='w-[30px] h-[30px] text-sky-400 cursor-pointer ' src="/imgs/addAvatar.png" alt="" />
          </label>
          <span className='text-gray-700 text-[13px]'>Add an profile picture</span>
          <input type="file" id='file' className='hidden' />
        </div>
        <button
          className='bg-gradient-to-r from-teal-500 to-teal-600 mt-2 text-gray-100 font-semibold p-[5px] rounded-sm shadow-md hover:bg-teal-700'>Update</button>
      </form>
    </div>
  )
}

export default UpdateForm