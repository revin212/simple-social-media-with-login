import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function EditPost({postId, username, postContent, token, setError, getUserPosts}) {
    const [selectedContent, setSelectedContent] = useState(postContent)

    useEffect(()=>{
        setSelectedContent(postContent);
    },[postContent, setSelectedContent])

    const editSelectedPost = async (e) => {
        try {
            e.preventDefault()
            document.getElementById(`${postId}`).classList.toggle('hidden')
            document.getElementById(`${postId}-2`).classList.toggle('hidden')
            const id = postId;
            let filteredContent = selectedContent
            filteredContent = filteredContent.replace(/'/g, "\\'")
            .replace(/`/g, "\\`")
            .replace(/"/g, '\\"')
            const instance = axios.create({withCredentials: true});
            await instance.put(`https://strange-flannel-shirt-ox.cyclic.app/posts/`, {
                username: username,
                id: id,
                content: filteredContent
            }, {
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
        <button onClick={()=>document.getElementById(`${postId}-2`).classList.toggle('hidden')}>
            Edit
        </button>

        <div id={`${postId}-2`} className="edit-form hidden z-10 absolute top-[2rem] right-[-2rem] lg:top-0 lg:right-[5rem]">
            <form onSubmit={editSelectedPost}>
                <textarea name={`create-post-${postId}`}
                onChange={(e)=>setSelectedContent(e.target.value)} 
                rows="5" 
                style={{resize:'none'}}
                value={selectedContent}
                className=' rounded-md bg-gray-700 outline-none border-[1px] p-4 w-[200px]'></textarea>
                <div className="submit w-full flex justify-end mt-2">
                    <input type="submit" value={'Update Post'} className='w-full max-w-[200px] rounded-md bg-gray-500 hover:bg-gray-400 cursor-pointer py-1' />
                </div>
            </form>
        </div>
    </>
  )
}
