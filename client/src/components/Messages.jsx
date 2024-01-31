import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { io } from 'socket.io-client'
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AuthContext } from '../context/authContext'




const Messages = () => {
  const { id } = useParams()
  const scrollRef = useRef()
  const socket = useRef()
  const {currentUser} = useContext(AuthContext)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [messages, setMessages] = useState(null)



  useEffect(() => {
    socket.current = io('http://localhost:5000')

    socket.current.on('getMessage', ({ desc, sender, conversationId, img }) => {
      setArrivalMessage({
        conversationId,
        desc,
        img,
        sender,
        deleted:false,
        createdAt: moment().format(),
        updatedAt: moment().format(),

      })
    })

  }, [])


  useEffect(() => {
    socket.current.emit('addUser', currentUser._id)
    socket.current.on('getUsers', (data) => {
    })

  }, [currentUser._id])



  /// Fetch all messages of a conversation
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages', id],
    queryFn: () =>
      makeRequest(`/messages/${id}`).then((res) => {
        setMessages(res.data);
        return res.data;
      }),
  });

    /// Fetch  current conversation
    const { isLoading:isLoadingConv, error:errConv, data:conv } = useQuery({
      queryKey: ['conv', id],
      queryFn: () =>
        makeRequest(`/conv/single/${id}`).then((res) => {
          return res.data;
        }),
    });



  useEffect(() => {
    arrivalMessage &&
    conv?.members.includes(arrivalMessage?.sender) &&
      setMessages((prev) => (prev ? [...prev, arrivalMessage] : [arrivalMessage]))
  }, [arrivalMessage]);



  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [id, messages])

  return (
    <div className='h-full  p-4'>
      {
        isLoading ?
          (
            <Box  sx={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
              <CircularProgress />
            </Box>
          ) :
          error ? 'Error...' :
            messages?.filter(message=>message.deleted === false || message.deletedBy !== currentUser._id  ).map(item =>
              <div key={item._id} ref={scrollRef} className="">
                <Message messages={item} />
              </div>
            )
      }
    </div>
  )
}

export default Messages