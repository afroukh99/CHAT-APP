import React, { useContext, useEffect, useRef, useState } from 'react'
import LeftBar from '../components/LeftBar';
import Write from '../components/Write'
import Navbar from '../components/Navbar';
import Messages from '../components/Messages';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { io } from 'socket.io-client';
import { AuthContext } from '../context/authContext';
import ScaleLoader from "react-spinners/ScaleLoader";




const Conversation = () => {

  const socket = useRef()
  const [onlineFriends, setOnlineFreinds] = useState({})
  const { currentUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)




  useEffect(() => {
    socket.current = io('http://localhost:5000')
  }, [])


  useEffect(() => {
    socket.current.on('getUsers', users => {
      const onlineUsers = users.filter(user => user.userId !== currentUser._id)
      setOnlineFreinds(onlineUsers)
    })
  }, [currentUser])


  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      makeRequest.get("/users").then((res) => {
        return res.data;
      }
      )
  })






  return (
    <div className="bg-gray-100 flex h-screen    justify-center items-center">
      <div className='flex w-[900px] h-4/5 shadow-mo rounded-lg font-lato bg-white '>
        <LeftBar />
        <div className="flex flex-col   h-full w-full flex-[5]">
          <Navbar />
          <div style={{ height: 'calc(100% - 60px)' }} className="flex w-full  flex-col relative">
            <div className="flex-[6] h-full overflow-y-scroll bg-neutral-50">
              <Messages />
            </div>
            <Write setLoading={setLoading} />
            {loading && <div className="w-full h-full absolute inset-0  flex justify-center items-center bg-black bg-opacity-5 backdrop-blur-sm">
              <ScaleLoader className='' loading={loading} color="#36d7b7" />
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Conversation