import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import postsService from '../services/posts'
import Notification from './Notification'

const EditPost = ({ updateFeed }) => {
    const [onePost, setOnePost] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [failMessage, setFailMessage] = useState(null)
    let history = useHistory();
    const id = useParams().id

    const fetchingPosts = async () => {
        const result = await postsService.getAll()
        updateFeed(result.reverse())
    }    


    const handleUpdatePost = async (e) => {
        e.preventDefault()
        try {
            const updatePost = {
                title: title,
                content: content
            }
            await postsService.update(id, updatePost)
            fetchingPosts()
            history.push('/')
        } catch (error) {
            console.error(error)
            setFailMessage('Add some content to the post! (4 characters min.)')
            setTimeout(() => {
                setFailMessage(null)
            }, 3000);
        }
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          postsService.setToken(user.token)
        }
      }, [])
    
    useEffect(() => {
        const fetchingOnePost = async () => {
            try {
                const result = await postsService.getOne(id)
                delete result.postImage
                delete result.replies
        
                setOnePost(result)
            } catch (error) {
                console.error(error)
            }
        }
        fetchingOnePost()
    }, [id])

    return (       
    <form onSubmit={handleUpdatePost}>
        <div className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 px-4 mt-4 mb-5 bg-indigo-100">
        <Notification className={'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'} message={failMessage}></Notification>
        <h1 className="text-xl px-2 py-3 font-bold">Edit the post called "{onePost.title}"</h1>
        <label
        className="block text-gray-700 text-sm font-bold mb-2 pt-2"
        htmlFor="title"
        >
        Title:
        </label>
            <input 
            className="text-3xl px-2 font-bold"
            placeholder={onePost.title}
            value={title}
            onChange={({target}) => setTitle(target.value)}
            >
            </input>
        <label
        className="block text-gray-700 text-sm font-bold mb-2 pt-2"
        htmlFor="content"
        >
        Content:
        </label>
            <textarea 
            className="resize-none border w-full h-20 rounded focus:outline-none focus:shadow-outline py-2 px-3" 
            id="content" 
            type="text" 
            placeholder={onePost.content}
            value={content}
            onChange={({target}) => setContent(target.value)}
            >
        </textarea>
        <button 
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-3" 
        type="submit"
        >
            Submit post 
        </button>
    </div>
  </form> 
  )
}

export default EditPost