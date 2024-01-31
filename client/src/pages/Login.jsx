import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { loginValidation } from '../validations/authValidation';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import PulseLoader from "react-spinners/PulseLoader";




const Login = () => {
  const { login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidation)
  });


  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await login(data)
      setLoading(false)
      navigate('/')
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  return (
    <div className='flex h-screen bg-gray-50 justify-center items-center '>
      {
        loading ?
          <PulseLoader className=''
            loading={loading} color="#36d7b7" />
          :
          <div className='flex flex-col rounded-md shadow-md font-lato gap-4 bg-white  w-[400px] p-8 '>
            <h1 className='font-semibold font-popins  text-2xl text-center mb-4 text-gray-800'>Sign in to your account</h1>
            <label htmlFor=""
              className='text-gray-700 text-[14px] '>Username</label>
            <input
              name='username'
              type="text"
              placeholder=''
              className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
              {...register("username")}
            />
            <span className='text-red-500 text-[12px] font-bold'> {errors.username?.message}</span>
            <label htmlFor="" className='text-gray-700 text-[14px] '>Password</label>
            <input
              type="password"
              name='password'
              placeholder=''
              className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
              {...register("password")}
            />
            <span className='text-red-500 text-[12px] font-bold'> {errors.password?.message}</span>
            <span className='cursor-pointer hover:text-teal-800 text-sm font-semibold text-teal-700'>Forgot password ?</span>
            <button
              onClick={handleSubmit(onSubmit)}
              className='bg-gradient-to-r from-teal-500 to-teal-600 mt-2 text-gray-100 font-semibold p-[5px] rounded-sm shadow-md hover:bg-teal-700'>Sign in</button>
            <span className='text-gray-500 text-sm'>Not member <Link to={'/register'} className='text-teal-600 font-semibold cursor-pointer hover:text-teal-700 ml-1'>Register now !</Link></span>
            <Toaster />
          </div>
      }

    </div>
  )
}

export default Login