import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import GetAllPosts from './get_posts/GetAllPosts';

export default function AllPosts({loggedIn, setLoggedIn, token, setToken}) {
    // const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [content, setContent] = useState('');
    const [postIsCreated, setPostIsCreated] = useState(false);

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
                setName(decoded.name);
                setUsername(decoded.username);
            } catch (error) {
                // setLoggedIn(false)
                return
            }
        };
        refreshToken();
        
    }, [setLoggedIn, setToken])


    const createPost = async (e) => {
        try {
            e.preventDefault()
            e.target.reset()
            let filteredContent = content
            filteredContent = filteredContent.replace(/'/g, "\\'")
            .replace(/`/g, "\\`")
            .replace(/"/g, '\\"')
            const instance = axios.create({withCredentials: true});
            await instance.post('https://strange-flannel-shirt-ox.cyclic.app/posts', {
                author: name,
                username: username,
                content: filteredContent
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className='w-full max-w-[1100px] mx-auto pt-[3rem]'>
        <div className="create-post my-[3rem]">
            {loggedIn?
            <form onSubmit={async (e)=>{await createPost(e); setPostIsCreated(true)}} className='flex flex-col'>
            <label htmlFor="create-post" className='text-xl mb-4'>Create a Post</label>
            <textarea name="create-post" 
            onChange={
                (e)=>{setContent(e.target.value);}
            }
            id="create-post" 
            rows="5" 
            style={{resize:'none'}}
            placeholder='Write a post...' 
            className=' rounded-md bg-gray-700 outline-none border-[1px] p-4 w-full'></textarea>
            <div className="submit w-full flex justify-end mt-2">
                <input type="submit" value={'Post'} className='w-full max-w-[100px] rounded-md bg-gray-500 hover:bg-gray-400 cursor-pointer py-1' />
            </div>
            </form>
            :
            <div className="login-to-post">
                <p>Please <Link to={'/login'} className='text-blue-400 hover:underline'>Login</Link> to create a post</p>
            </div>
            }
            
        </div>
        <div className="All-posts pb-[3rem]">
            <h1 className='font-bold text-2xl'>
                All Posts
            </h1>

            <div className="posts-container flex flex-col gap-[1.5rem]">
                <GetAllPosts postIsCreated={postIsCreated} setPostIsCreated={setPostIsCreated} />
            </div>
        </div>
    </div>
  )
}
