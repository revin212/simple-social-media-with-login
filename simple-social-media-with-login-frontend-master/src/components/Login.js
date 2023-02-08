import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login({setLoggedIn, setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();


  const Auth = async (e) => {
    e.preventDefault();
    setLoggingIn(true)
    try {
    const instance = axios.create({withCredentials: true});
    const res = await instance.post('https://strange-flannel-shirt-ox.cyclic.app/login', {
      username: username,
      password: password
    });
      // console.log(res)
      setToken(res.data.accessToken)
      setLoggedIn(true);
      setLoggingIn(false);
      navigate('/');
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className=' pt-[6rem] max-w-[1100px] mx-auto flex justify-center items-center'>
        <div className="login-form w-[100%] max-w-[500px] justify-center items-center">
            <h1 className='font-bold text-2xl mb-[0.5rem]'>
                Login
            </h1>

              <p className="redirect-to-login mb-[2rem]">
                Don't have an account? <Link to={'/register'} className='text-blue-400 hover:underline'>Register</Link>
              </p>

            <form onSubmit={Auth} className='flex flex-col'>
              {msg && <p className='w-full text-center py-2 border-[1px] border-red-400 mb-[1rem]'>{msg}</p>}
              <label htmlFor="">Username</label>
              <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />
              <label htmlFor="">Password</label>
              <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />
              
              <input 
              type="submit" 
              value={loggingIn? "Loading..." : "Login"} 
              className=" bg-gray-500 hover:bg-gray-400 py-2 px-4 cursor-pointer rounded-md mt-[1rem]"/>
            </form>
        </div>
    </div>
  )
}
