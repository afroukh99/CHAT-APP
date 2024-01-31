import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import moment from 'moment'
import { useParams } from 'react-router-dom';
import Modaal from './Modaal';
import { AuthContext } from '../context/authContext'





const Message = ({ messages }) => {
    const { currentUser } = useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false)



    function handleOpenModal() {
        setOpenModal(true);
    }




    const { isLoading, error, data } = useQuery({
        queryKey: [messages.sender],
        queryFn: () =>
            makeRequest.get(`/users/single/${messages.sender}`).then((res) => {
                return res.data;
            }
            )
    })


    return (
        <div className="flex flex-col  gap-2">
            <div className={`flex gap-2  max-w-[80%]  font-popins mb-5 
            ${currentUser._id !== messages.sender && " self-end  flex-row-reverse "}`}>
                <img className='w-[35px] h-[35px] rounded-full object-cover' src={!data?.img ? '/imgs/noavatar.jpg' : data.img} alt="" />
                {isLoading ? 'loading' :
                    error ? 'error' :
                        <div className="flex flex-col   w-full gap-[3px] font-semibold ">
                            <span className='text-zinc-500    text-[13px] '>{currentUser._id === messages.sender ? 'Me' : data?.username}
                            </span>
                            {messages?.img && messages?.desc
                                ?
                                <>
                                    <img onClick={handleOpenModal} className='w-24 h-24 rounded-sm object-cover cursor-pointer' src={messages?.img} alt="" />
                                    <p className={`text-[11px] min-w-[50px]  max-w-max   px-2 py-[5px]  rounded-lg 
                                ${currentUser._id === messages?.sender ? "text-zinc-600 bg-[#e6e5e5]"
                                            : " bg-teal-400 text-neutral-50"}`}>
                                        {messages?.desc}
                                    </p>
                                </>
                                :
                                messages?.img ?
                                    <img onClick={handleOpenModal} className='w-24 h-24 rounded-sm object-cover cursor-pointer' src={messages?.img} alt="" />
                                    :
                                    <p className={`text-[11px] min-w-[50px]  max-w-max   px-2 py-[5px]  rounded-lg 
                             ${currentUser._id === messages?.sender ? "text-zinc-600 bg-[#e6e5e5]"
                                            : " bg-teal-400 text-neutral-50"}`}>
                                        {messages?.desc}
                                    </p>

                            }
                            <span className='text-[10px] text-zinc-500  font-medium ml-1'>
                                {moment(messages?.createdAt).fromNow()}
                            </span>
                        </div>}

                <Modaal openModal={openModal}  >
                    <span onClick={() => setOpenModal(false)} className='absolute cursor-pointer  top-[-4px] right-[8px] text-center  font-semibold text-[17px] text-neutral-800 '>X</span>
                    <img className='w-[450px] h-[450px] object-cover' src={messages.img} alt="" />
                </Modaal>
            </div>



        </div>



    )
}

export default Message