"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from "react-hot-toast"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user);

      console.log("Signup Success", response.data);
      router.push("/login")
      toast.success("Signup Success")
    } catch (error) {
      console.log("Signup Failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-2 border-2 border-fuchsia-300 w-full bg-fuchsia-100 shadow-inner'>
      <h1 className='text-xl font-semibold text-purple-400'>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor='username' className='mt-4'>Username</label>
      <input 
        type="text"
        id='username'
        value={user.username}
        onChange={(e)=> setUser({...user, username: e.target.value})} 
        placeholder='Username'
        className='p-2 border-2 border-fuchsia-200 rounded-lg focus:outline-none focus:border-purple-500 text-black'
      />

      <hr />
      <label htmlFor='email' className='mt-4'>Email</label>
      <input 
        type="text"
        id='email'
        value={user.email}
        onChange={(e)=> setUser({...user, email: e.target.value})} 
        placeholder='Email'
        className='p-2 border-2 border-fuchsia-200 rounded-lg focus:outline-none focus:border-purple-500 text-black'
      />

      <hr />
      <label htmlFor='password' className='mt-4'>Password</label>
      <input 
        type="text"
        id='password'
        value={user.password}
        onChange={(e)=> setUser({...user, password: e.target.value})} 
        placeholder='Password'
        className='p-2 border-2 border-fuchsia-200 rounded-lg focus:outline-none focus:border-purple-700 text-black'
      /> 
      <button 
        onClick={onSignup}
      className='border-2 border-fuchsia-700 bg-fuchsia-600 text-white font-mono font-semibold mt-4 p-2 rounded-lg '>
        {buttonDisabled ? "Please fill all fields" : "Signup"}
      </button>
      <Link href={"/login"}>Visit Login Page</Link>

    </div>
  )
}

export default SignupPage;