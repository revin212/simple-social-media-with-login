import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import GetUserPosts from './get_posts/GetUserPosts.js';
import { useNavigate } from 'react-router-dom';

export default function MyPosts({loggedIn, setLoggedIn, token, setToken}) {
    // const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const instance = axios.create({withCredentials: true});
                const response = await instance.get('https://strange-flannel-shirt-ox.cyclic.app/token')
                if(response.status === 200) {
                    setLoggedIn(true)
                }
                setToken(response.data.accessToken)
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.name)
                setUsername(decoded.username);
            } catch (error) {
                setLoggedIn(false);
                navigate('/login');
            }
        }
        refreshToken();
    }, [navigate, setLoggedIn, setToken])


  return (
    <div className='max-w-[1100px] mx-auto pt-[6rem]'>
        <div className="profile mb-[2rem] mt-[2rem]">
            <h1 className='font-bold text-2xl'>
                {name}
            </h1>
            <h2 className='font-semibold text-lg'>
                @{username}
            </h2>
        </div>
        <div className="my-posts pb-[8rem]">
            <h3 className='font-semibold text-lg'>
                My Posts
            </h3>
            <div className="posts-container flex flex-col gap-[1.5rem]">
                {token && <GetUserPosts token={token} username={username} />}
            </div>
        </div>
    </div>
  )
}
