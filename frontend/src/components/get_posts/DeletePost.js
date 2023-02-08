import React from 'react'
import axios from 'axios'

export default function DeletePost({postId, username, token, setError, getUserPosts}) {

    const deleteSelectedPost = async (e) => {
        try {
            const id = postId;
            const instance = axios.create({withCredentials: true});
            await instance.delete(`https://strange-flannel-shirt-ox.cyclic.app/posts/${username}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            await getUserPosts()
        } catch (error) {
            console.log('error: ',error)
            setError(error)
        }
    }


  return (
    <>
        <button onClick={(e)=>deleteSelectedPost(e)}>
            Delete
        </button>
    </>
  )
}
