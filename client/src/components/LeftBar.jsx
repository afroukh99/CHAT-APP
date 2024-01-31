import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Chat from './Chat'
import { makeRequest } from '../axios';
import { useQuery } from '@tanstack/react-query';
import TopBar from './TopBar';
import UsersMenu from './UsersMenu';
import { AuthContext } from '../context/authContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const LeftBar = () => {

  const { pathname } = useLocation()
  const {currentUser} = useContext(AuthContext)
  const [search, setSearch] = useState('')
  const [openMenu, setOpenMenu] = useState(false)





  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      makeRequest.get(`/conv/${currentUser._id}`).then((res) =>
        res.data,
      ),
  })

  return (
    <div className={`flex-[2] h-full ${pathname !== '/' && 'max-sm:hidden'}`}>
      <div className="flex flex-col   font-lato h-full">
        <TopBar pathname={pathname} />
        <div className="w-full relative">
          <input
            onChange={e => setSearch(e.target.value)}
            onClick={() => setOpenMenu(!openMenu)}
            className='h-[35px] px-3 w-full  bg-[#12857be0] border-b text-sm 
             border-neutral-300 text-neutral-50 placeholder:text-neutral-100 placeholder:text-[13px]'
            type="text" placeholder='Find a user' />
          {openMenu &&
            <UsersMenu setOpenMenu={setOpenMenu} search={search} />}
        </div>
        {isLoading ? 
          (
            <Box  sx={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
              <CircularProgress style={{padding: "10px"}}  />
            </Box>
          ) :
          error ? 'Something went wrong!' :
            <div style={{ height: 'calc(100% - 95px)' }} className="flex flex-col gap-2 bg-[#12857be0]  overflow-auto">    
              {
                data && data.map(item => (
                 !openMenu && <Chat conversation={item} search={search} key={item._id} />
                ))}
            </div>
        }


      </div>
    </div>
  )
}

export default LeftBar