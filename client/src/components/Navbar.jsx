import React, { useContext, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { makeRequest } from '../axios'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Modaal from './Modaal';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';




const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const {currentUser} = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)




  const { isLoading, error, data } = useQuery({
    queryKey: [id],
    queryFn: () =>
      makeRequest.get(`/conv/single/${id}`).then((res) => {
        return res.data.members.find((user) => user !== currentUser._id)
      }),
  })




  const { isLoading: isLoadingUser, error: err, data: userData } = useQuery({
    queryKey: [data],
    queryFn: () =>
      makeRequest.get(`/users/single/${data}`).then((res) => {
        return res.data
      })
  })


  const handleOpenModal = () => {
    setOpenModal(true)
    setOpen(false)
  }


  const handleDelete = (e) => {
    e.preventDefault()
    try {
      makeRequest.put(`/messages/${id}`,{userId:currentUser._id})
      setOpenModal(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await makeRequest.post('/auth/logout')
      localStorage.setItem('currentUser', null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-5 h-[60px] w-full   bg-[#1a9b90ec]'>
      <div className="flex  justify-between items-center  h-full w-full">
        {
          isLoadingUser ?   (
            <Box  sx={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
              <CircularProgress style={{padding: "10px"}}  />
            </Box>
          ) :
            err ? 'something went wrong' :
                <div className="flex items-center relative gap-3  px-5 p-2  cursor-pointer">
                  <Link className='sm:hidden' to={'/'}><ArrowBackIosIcon className='text-zinc-200 '/></Link> 
                  <img className='w-[40px] h-[40px] relative object-cover rounded-full cursor-pointer'
                    src={userData.img ? userData.img : '/imgs/noavatar.jpg'} alt="" />
                  <span className='w-[12px] h-[12px] rounded-full absolute sm:left-[32%] top-2 left-[45%]   bg-green-500'></span>
                  <div className="flex flex-col justify-center font-popins">
                    <span className='font-semibold  text-neutral-100 text-sm ' >{userData.username}</span>
                    <span className='text-neutral-100 text-[11px] '>Online</span>
                  </div>
                </div>
        }
        <div className=" flex gap-3 items-center text-neutral-100 cursor-pointer relative">
          <span onClick={handleClick}><LogoutIcon /></span>
          <VideoCallOutlinedIcon />
          <span onClick={() => setOpen(!open)}><MoreHorizOutlinedIcon /></span>
          {open && <div className="w-[150px] max-h-[200px] p-2 bg-neutral-50
                          cursor-pointer absolute
                            top-[29px] right-[9px] rounded-md shadow-mo
                            text-zinc-700 hover:text-red-600
                            z-10
            ">
            <span onClick={handleOpenModal} className=' font-popins text-[13px]'>Clear all messages</span>
          </div>
          }
          {openModal &&

            <Modaal openModal={openModal}>
              <div className="flex gap-3  w-[300px]">
                <div className='bg-red-100  rounded-full w-[35px] h-[35px] flex items-center justify-center'>
                  <WarningAmberOutlinedIcon className='text-red-600 ' />
                </div>
                <div className="flex flex-col flex-[5]  gap-3">
                  <span className=' text-zinc-900 font-semibold'>Delete all messages</span>
                  <span className=' text-zinc-600 text-[14px]'>Are you sure you to delete all messages? This action cannot be undone.</span>
                  <div className="flex gap-6 self-end items-center text-[14px] font-semibold">
                    <button className='text-zinc-500 hover:text-zinc-700' onClick={() => setOpenModal(false)}>Cancel</button>
                    <button className=' text-white bg-red-500 hover:bg-red-400 px-[6px] p-1 rounded-md ' onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              </div>


            </Modaal>}

        </div>
      </div>
    </div>
  )
}

export default Navbar