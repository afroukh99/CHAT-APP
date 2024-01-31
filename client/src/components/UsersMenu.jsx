import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { makeRequest } from '../axios'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/authContext'

const UsersMenu = ({ search, setOpenMenu }) => {
    const queryClient = useQueryClient()
    const { currentUser } = useContext(AuthContext)
    const { id } = useParams()
    const [receiverId, setReceiverId] = useState(null)

    const { isLoading, error, data } = useQuery({
        queryKey: ['users'],
        queryFn: () =>
            makeRequest.get(`/users/`).then((res) =>
                res.data,
            ),
    })


    const mutation = useMutation({
        mutationFn: (newConversation) => {
            makeRequest.post(`/conv`, newConversation)
        },
        onSuccess: queryClient.invalidateQueries({ queryKey: ["conversations"] }),
        onError: (error) => {
            console.log(error)
        }
    })

    const handleSelect = (e) => {
        e.preventDefault()
        console.log(e.target.id)
        setOpenMenu(false)

    }


    return (

        <div className='absolute top-[35px]  w-full font-popins  bg-[#197069e0] shadow-mo max-h-[250px]
        overflow-auto    flex flex-col 
         '>
            {
                isLoading ? 'loading' :
                    error ? 'error' :
                        data.filter(user => user.username.toLowerCase().includes(search))
                            .filter(u => u._id !== currentUser._id)
                            .map(user =>
                                <div key={user?._id} id={user._id} onClick={handleSelect}  className="flex gap-2 px-4 items-center py-2 cursor-pointer hover:bg-teal-600">
                                    <>
                                        <img className='w-[35px] h-[35px] rounded-full object-cove'
                                            src={!user.img ? '/imgs/noavatar.jpg' : user?.img} alt="" />
                                        <div className="flex flex-col ">
                                            <span className='text-zinc-200    text-[13px]'>{user?.username}</span>
                                            <span className='text-zinc-300 text-[10px]'>Online</span>
                                        </div>
                                        <Toaster />
                                    </>
                                </div>)
            }
        </div>
    )
}

export default UsersMenu