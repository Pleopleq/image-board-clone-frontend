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
            const comment = await commentService.newComment(id, newComment)
            setMessage(' ')
            setAllComments(allComments.concat(comment))
            }
        } catch (error) {
            setFail('Something went wrong')
            setTimeout(() => {
                setFail(null)
            }, 3000);
        }
    }


    const handleShowCommentButtons = (comment) => {
        const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
        if (!user){
          return null
        } else if(loggedUser.username !== comment.author){
          return null
        }
        return (
            <>
            <span className="px-6 text-sm"> <a className="hover:text-indigo-300 hover:border-indigo-600 border-b border-gray-600 mx-2" href='#'>Delete</a> <a className="hover:text-indigo-300 hover:border-indigo-600 border-b border-gray-600"  href='#'>Edit</a> </span>
            </>
        )
      } 

    return (
        <>
        <ul className="px-4 divide-y divide-gray-400 list-none">
        {allComments.map((comment, index) => 
          <li key={index} className="bg-indigo-100 font-light text-gray-700 py-2 break-words">
            {comment.message} - <span className="font-bold">{comment.author}</span> {handleShowCommentButtons(comment)}
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
