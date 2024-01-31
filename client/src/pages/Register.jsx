import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { makeRequest } from '../axios'
import toast, { Toaster } from 'react-hot-toast';
import upload from '../utils/upload'
import { registerSchema } from '../validations/authValidation';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import PulseLoader from "react-spinners/PulseLoader";



const Register = () => {
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const url = file !== null && await upload(file)
      console.log(url)
      await makeRequest.post(`/auth/register`, { img: url, ...data })
      setLoading(false);
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data)
    }
  }


  return (
    <div className='flex h-screen bg-gray-50 justify-center items-center '>
      <div className='flex flex-col rounded-md shadow-md font-lato gap-2 bg-white max-h-max w-[400px] px-8 py-4 b'>
        <h1 className='font-semibold font-popins  text-2xl text-center mb-2 text-gray-800'>Create your account</h1>
        <label htmlFor="" className='text-gray-600 text-[13px] '>Username</label>
        <input
          type="text"
          name='username'
          placeholder=''
          className={`bg-slate-50  border shadow-sm text-slate-700 text-sm p-[5px] rounded-md`}
          {...register("username")}
        />
        <span className='text-red-500 text-[12px] font-bold'> {errors.username?.message}</span>
        <label htmlFor="" className='text-gray-600 text-[13px] '>Email</label>
        <input
          type="email"
          name='email'
          placeholder=''
          className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          {...register("email")}
        />
        <span className='text-red-500 text-[12px] font-bold'> {errors.email?.message}</span>
        <label htmlFor="" className='text-gray-600 text-[13px] '>Password</label>
        <input
          type="password"
          name='password'
          placeholder=''
          className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          {...register("password")}
        />
        <span className='text-red-500 text-[12px] font-bold'> {errors.password?.message}</span>

        <label htmlFor="" className='text-gray-600 text-[13px] '>Confirm password</label>
        <input
          type="password"
          name='cpassword'
          placeholder=''
          className='bg-slate-50 border shadow-sm text-slate-700 text-sm p-[5px] rounded-md'
          {...register("cpassword")}
        />
        <span className='text-red-500 text-[13px] font-bold'> {errors.cpassword?.message}</span>

        <div className="flex gap-3 items-center mt-3 mb-1">
          {
            file &&
            <img className='w-[30px] h-[30px] relative object-cover rounded-sm cursor-pointer'
              src={URL.createObjectURL(file)} alt="" />
          }
          <label
            className='text-gray-700 text-[13px] cursor-pointer'
            htmlFor="file">
            <img className='w-[30px] h-[30px] text-sky-400 cursor-pointer ' src="/imgs/addAvatar.png" alt="" />
          </label>
          <span className='text-gray-700 text-[13px]'>Add an profile picture</span>
          <input name='img' onChange={(e) => setFile(e.target.files[0])} type="file" id='file' className='hidden' />
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          className='bg-gradient-to-r from-teal-500 to-teal-600 mt-2 text-gray-100 font-semibold p-[5px] rounded-sm shadow-md hover:bg-teal-700'>
          {
            loading ?
              <PulseLoader className='' size={10}
                loading={loading} color="#36d7b7" />
              :
              'Sign in'
          }
        </button>
        <span className='text-gray-500 text-sm'>Already have an account ?  <Link to={'/login'} className='text-teal-700 font-semibold cursor-pointer hover:text-teal-700 ml-1'>Connection</Link></span>
      </div>

      <Toaster />
    </div>
  )
}

export default Register