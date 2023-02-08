import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [registering, setRegistering] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    setRegistering(true);
    if(username.indexOf('\'') > 0 || username.indexOf('"') > 0 || username.indexOf('`') > 0){
      alert('username must not contain \', ", or `')
      return
    } else if(password.indexOf('\'') > 0 || password.indexOf('"') > 0 || password.indexOf('`') > 0){
      alert('password must not contain \', ", or `')
      return
    }
    let filteredName = name
    filteredName = filteredName.replace(/'/g, "\\'")
      .replace(/`/g, "\\`")
      .replace(/"/g, '\\"')
    try {
      await axios.post('https://strange-flannel-shirt-ox.cyclic.app/users', {
        name: filteredName,
        username: username,
        password: password,
        confPassword: confPassword,
      })
      setRegistering(false);
      navigate('/login');
    } catch (error) {
      if(error.response){
        setMsg(error.response.data.msg)
      }
    }
  }

  return (
    <div className='max-w-[1100px] mx-auto flex justify-center items-center h-full pt-[6rem]'>
        <div className="register-form w-[100%] max-w-[500px] justify-center items-center">
            <h1 className='font-bold text-2xl mb-[0.5rem]'>
                Register
            </h1>

              <p className="redirect-to-login mb-[2rem]">
                Already have an account? <Link to={'/login'} className='text-blue-400 hover:underline'>Login</Link>
              </p>

            <form onSubmit={Register} className='flex flex-col'>
                {msg && <p className='w-full text-center py-2 border-[1px] border-red-400 mb-[1rem]'>{msg}</p>}
                <label htmlFor="">Name</label>
                <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />

                <label htmlFor="">Username</label>
                <input 
                type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                 className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />

                <label htmlFor="">Password</label>
                <input 
                type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />

                <label htmlFor="">Confirm Password</label>
                <input 
                type="password" 
                value={confPassword}
                onChange={(e)=>setConfPassword(e.target.value)}
                className='mb-[1.5rem] bg-gray-600 outline-none py-2 px-4 rounded-md' />

                <input type="submit" 
                value={registering? "Loading..." : "Register" } 
                className=" bg-gray-500 hover:bg-gray-400 py-2 px-4 cursor-pointer rounded-md mt-[1rem] mb-[3rem]"/>
            </form>
        </div>
    </div>
  )
}
