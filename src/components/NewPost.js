import React, { useState, useEffect } from 'react'
import postsService from '../services/posts'

const NewPost = ({allPosts}) => {
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        postsService.setToken(user.token)
        }
    }, [])


    const onChangeHandler = (e) => {
        e.preventDefault()
        setImage(e.target.files[0])
    }

    const onUploadHandler = () => {
        const data = new FormData() 
        data.append('file', image)
    }

    const handleNewPost = async (e) => {
        e.preventDefault()
        try {
            const newPost = {
                title: title,
                content: content,
                postImage: image
            }
            const addedPost = await postsService.createPost(newPost)
            setTitle('')
            setContent('')
        } catch (error) {
            console.log(error)
        }
    }


    if(!user){
        return null
    }
    return (
    <div className="mb-12 mt-5 max-w-sm mx-auto md:max-w-lg lg:max-w-3xl">
        <form className="bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4" onSubmit={handleNewPost}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="title" 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={({target}) => setTitle(target.value)}
            />
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
            </label>
            <textarea 
            className="resize-none border w-full h-20 rounded focus:outline-none focus:shadow-outline py-2 px-3" 
            id="content" 
            type="text" 
            placeholder="Content"
            value={content}
            onChange={({target}) => setContent(target.value)}
            ></textarea>
            </div>
            <div className="flex w-full h-auto items-center justify-center bg-grey-lighter">
                <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-100 cursor-pointer hover:bg-blue-500 hover:text-white">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' className="hidden" onChange={onChangeHandler}/>
                </label>
                
            </div>
            <button 
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            type="button"
            onClick={onUploadHandler}
            >
                Button
            </button>
            <div className="flex items-center justify-center mt-8">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit post!
            </button>
            </div>
        </form>
    </div>
    )
}

export default NewPost