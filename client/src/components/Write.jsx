import React, { useContext, useEffect, useRef, useState } from 'react'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import upload from '../utils/upload'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { AuthContext } from '../context/authContext'




const Write = ({setLoading}) => {
  const { currentUser } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const socket = useRef()
  const { id } = useParams()
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState('')
  const [showEmojies, setShowImojies] = useState(false)


  useEffect(() => {
    socket.current = io('http://localhost:5000',
      {
        withCredentials: true,
        extraHeaders: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      }

    )
  }, [])



  const mutation = useMutation({
    mutationFn: (newMessage) => (
      makeRequest.post('/messages', newMessage)
    ),

    onSuccess: () => {
      queryClient.invalidateQueries([id])
    }
  }
  )


  const { isLoading, error, data: receiver } = useQuery({
    queryKey: ["receiver"],
    queryFn: () =>
      makeRequest.get(`/conv/single/${id}`).then((res) => {
        return res.data.members.find((user) => user !== currentUser._id)
      }),
  })


  
  const addEmoji = (e) => {
    const sym = e.unified.split("-")
    const emojiCode = []
    sym.forEach((el) => emojiCode.push('0x' + el))
    let emojis = String.fromCodePoint(...emojiCode)
    setDesc(prev => prev ? prev + emojis : emojis)
  }



  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = img && await upload(img)
    socket.current.emit('sendMessage', { desc, sender: currentUser._id, img: url, receiver, conversationId: id })
    mutation.mutate({ conversationId: id, desc, img: url, sender: currentUser._id })
    setDesc("")
    setImg('')
    setShowImojies(false)
    setLoading(false)
  }

  return (
    <div className='flex-[1] w-full h-full '>
      <div className="flex p-3 items-center  h-full w-full">
        <input
          className='text-neutral-700 text-[15px] flex-[4]'
          name='desc'
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text" placeholder='Write a message ...' />
        <div className="relative flex text-neutral-600 cursor-pointer gap-3 justify-center items-center flex-[1.5] w-full">
          {
            img &&
            <img className='w-[30px] h-[30px] relative object-cover rounded-sm cursor-pointer'
              src={URL.createObjectURL(img)} alt="" />
          }
          <label htmlFor="file"><AddPhotoAlternateOutlinedIcon className='cursor-pointer' />
          </label>
          <span onClick={() => setShowImojies(!showEmojies)}><InsertEmoticonIcon /></span>
          <input type="file" className='hidden' name='file' id='file' onChange={(e) => setImg(e.target.files[0])} />
          <button
            onClick={handleClick}
            className='px-2 py-1 bg-teal-500 text-neutral-100 text-[14px] font-semibold hover:bg-teal-600'>Send
          </button>
          {showEmojies &&
            <div className=" absolute bottom-full right-[10%]">
              <Picker data={data}
                onEmojiSelect={addEmoji}
                emojiSize={22}
                emojiButtonSize={28}

              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Write