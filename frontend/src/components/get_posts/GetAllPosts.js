import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export default function GetAllPosts({postIsCreated, setPostIsCreated}) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const updatePosts = useCallback(()=>{
        getAllPosts();
        if(postIsCreated){
            setPostIsCreated(false)
        }
    }, [postIsCreated, setPostIsCreated])

    const getAllPosts = async () => {
        try {
        const response = await axios.get('https://strange-flannel-shirt-ox.cyclic.app/posts')
        setPosts(response.data.reverse())
        setLoading(false)
    } catch (error) {
        setLoading(false)
        setError(error)        
    }
    }

    useEffect(() => {
        updatePosts();
    }, [updatePosts])

    // if(postIsCreated){
    //     getAllPosts();
    //     setPostIsCreated(false);
    // }

  return (
    <div className="post">
        {posts?.map((post, index) => {
            return(
            <div key={post.id} className="post my-6 break-words pb-4 border-b border-slate-600">
            <div className="header mb-3">
            <div className="author">
            <h3 className='font-semibold text-lg'>
                {post.author}
            </h3>
            <h2 className='font-semibold text-md'>
                @{post.username}
            </h2>
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
