import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import moreIcon from '../../images/more-icon.svg'
import DeletePost from './DeletePost'
import EditPost from './EditPost'

export default function GetUserPosts({token, username}) {
    const [userPosts, setUserPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const getUserPosts = useCallback(async () => {
        try {
            const instance = axios.create({withCredentials: true});
            const response = await instance.get(`https://strange-flannel-shirt-ox.cyclic.app/posts/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            await setUserPosts(response.data.reverse())
            setLoading(false)
        } catch (error) {
            console.log('error: ',error)
            setLoading(false)
            setError(error)
        }
    }, [token, username])

    useEffect(()=>{ if(username) getUserPosts(); } , [getUserPosts, username])


  return (
    <div className="post">
        {!loading &&
        userPosts?.map((post, index) => {
            return(
            <div key={index} className="post my-6 break-words pb-4 border-b border-slate-600">
                <div className="header mb-3 flex justify-between">
                    <div className="author">
                    <h3 className='font-semibold text-lg'>
                        {post.author}
                    </h3>
                    <h2 className='font-semibold text-md'>
                        @{post.username}
                    </h2>
                    </div>
                    <div className="delete relative">
                        <button 
                        onClick={()=>document.getElementById(`${post.id}`).classList.toggle('hidden')}>
                            <img src={moreIcon} alt='more-option' className='w-[25px]' />
                        </button>
                        
                        <div id={`${post.id}`} className="edit-delete hidden absolute top-0 right-[2rem] bg-gray-700 p-2 rounded-lg">
                            <EditPost postId={post.id} username={post.username} postContent={post.content} token={token} setError={setError} getUserPosts={getUserPosts} />
                            <DeletePost postId={post.id} username={post.username} token={token} setError={setError} getUserPosts={getUserPosts} />
                        </div>
                    </div>                      
                </div>
                <p className='text-lg'>
                    {post.content}
                </p>
            </div>
            )
        })
        }
        {loading && <div className='fonst-semibold text-lg'>Loading...</div>}
        {error && <div className='fonst-semibold text-lg'>{error}</div>}
    </div>
  )
}
