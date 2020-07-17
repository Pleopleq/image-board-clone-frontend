import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import commentService from '../services/comments'


const CommentSection = ({id}) => {
    const [allComments , setAllComments] = useState([])
    const [message, setMessage] = useState('')
    const [failNotification, setFail] = useState(null)
    const [user, setUser] = useState(null)
    let postId = id

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          commentService.setToken(user.token)
        }
      }, [])

    useEffect(() => {
        commentService.getAll(postId).then(posts => {
            setAllComments(posts)
        })
    }, [postId])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        try {
            const newComment = { message: message, author: user.username}
            if(newComment.message === '' || newComment.message.length < 4){
                setFail('Comment needs to be at least 4 character long')
                setTimeout(() => {
                    setFail(null)
                }, 3000);
                return
            } else {
            commentService.newComment(id, newComment)
            setMessage(' ')
            setAllComments(allComments.concat(newComment))
            }
        } catch (error) {
            setFail('Something went wrong')
            setTimeout(() => {
                setFail(null)
            }, 3000);
        }
    }

    return (
        <>
        <ul className="px-4 divide-y divide-gray-400">
        {allComments.map((comment, index) => 
          <li key={index} className="bg-indigo-100 font-light text-gray-700 py-2">
            {comment.message} - <span className="font-bold">{comment.author}</span>
          </li>
        )}
        </ul>
            <Notification message={failNotification} className={"bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2"}></Notification>
        <form className="m-2" onSubmit={handleCommentSubmit}>     
            <input 
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
            type="text" 
            placeholder="Add comment"
            name="message"
            value={message}
            onChange={({target}) => setMessage(target.value)}
            />
        </form>
        </>
    )
}

export default CommentSection
