import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    useQuery,
} from '@tanstack/react-query'
import { makeRequest } from '../axios'
import { AuthContext } from '../context/authContext'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';





const Chat = ({ conversation }) => {
    const { currentUser } = useContext(AuthContext)
    const freindId = conversation.members.find((user) => user !== currentUser._id);



    const { isLoading, error, data } = useQuery({
        queryKey: [freindId],
        queryFn: () =>
            makeRequest.get(`/users/single/${freindId}`).then((res) =>
                res.data
            ),
    })




    const { isLoading: isLoadingMsg, error: err, data: dataMsg } = useQuery({
        queryKey: ['messsages', conversation._id],
        queryFn: () =>
            makeRequest.get(`/messages/${conversation._id}`).then((res) =>
                res.data,
            ),
    })

    

    return (
        <>

            {
                isLoading ? 'Loading...' :
                    error ? 'Something went wrong' :
                        <div className="flex items-center justify-between px-5 p-2    hover:bg-teal-700  cursor-pointer">
                            <Link to={`/conversation/${conversation._id}`}>
                                <div className="flex items-center  gap-3">
                                    <img className='w-[40px] h-[40px] object-cover rounded-full cursor-pointer'
                                        src={!data?.img ? "/imgs/noavatar.jpg" : data?.img} alt="" />
                                    <div className="flex flex-col   justify-between">
                                        <span className='font-semibold text-neutral-100 text-sm font-popins' >{data?.username}</span>
                                        {isLoadingMsg ? 'loading' :
                                            err ? 'error' :
                                                <p className='text-neutral-200 text-[12px]'>
                                                    {
                                                        dataMsg[dataMsg?.length - 1]?.img ?
                                                            'image'
                                                            :
                                                            dataMsg[dataMsg?.length - 1]?.desc.substring(0, 12)
                                                    }
                                                </p>
                                        }
                                    </div>
                                </div>
                            </Link>
                            <div className="flex justify-center items-center w-[30px] h-[30px] hover:bg-[#d5eee6]  rounded-full"
                                onClick={() => console.log("first")}
                            >
                                <MoreVertOutlinedIcon fontSize='small' className=' text-slate-300 hover:text-slate-500 ' />
                            </div>
                        </div>
            }

        </>


    )
}

export default Chat