import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import { makeRequest } from '../axios';
import Modaal from './Modaal';
import UpdateForm from './UpdateForm';
import { AuthContext } from '../context/authContext'
import { set } from 'react-hook-form';



const TopBar = ({ pathname }) => {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }


  function handleOpenModal() {
    setOpenModal(true);
    setOpen(false)
  }



  return (
    <div className="flex justify-between font-popins  text-neutral-100 items-center p-5 bg-[#0f766de0] w-full h-[60px]">
      {pathname !== '/' && <Link to={'/'}><WestOutlinedIcon className='cursor-pointer hover:text-neutral-200 ' /></Link>}
      <h1 className='font-semibold   text-[16px]'>Messages</h1>
      <div  onMouseLeave={()=> setOpen(false)} className="flex items-center relative gap-2">
        <img
          onMouseEnter={() => setOpen(true)}
          className='w-[30px]  h-[30px] object-cover rounded-full cursor-pointer'
          src={!currentUser?.img ? '/imgs/noavatar.jpg' : currentUser?.img} alt="" />
        <span className='font-semibold  text-xs'>{currentUser?.username}</span>
        {open && <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
          className="w-[150px] max-h-[200px] p-2 z-20 bg-neutral-50
                         cursor-pointer absolute
                          top-[30px] left-1 font-lato rounded-md shadow-mo
                          text-zinc-700 hover:text-zinc-600
                          
           ">
          <span onClick={handleOpenModal} className='text-[13px]'>Edite your informations</span>
          <hr className='mt-[3px]' />
          <span
            onClick={handleLogout}
            className='  text-[13px] hover:text-red-500'>Logout</span>
        </div>}
      </div>
      <Modaal openModal={openModal}  >
        <UpdateForm setOpenModal={setOpenModal} currentUser={currentUser} />
      </Modaal>
    </div>
  )
}

export default TopBar