import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import CommentInput from './CommentInput'
import commentService from '../services/comments'


const CommentSection = ({ id }) => {
    const [allComments , setAllComments] = useState([])
    const [message, setMessage] = useState('')
    const [failNotification, setFail] = useState(null)
    const [user, setUser] = useState(null)
    const [messageToUpdate, setMessageToUpdate] = useState(null)
    const [selectedComment, setSelectedComment] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)
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
      const abortController = new AbortController()
        const getComments = async () => {
          try {
          const allComments = await commentService.getAll(postId)
          setAllComments(allComments)
        } catch (error) {
          throw error;
        }
      } 
    getComments()
    return () => abortController.abort()
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

  const handleCommentUpdateSubmit = async (e) => {
    e.preventDefault()
      try {
        await commentService.update(selectedComment.id, { message: messageToUpdate })
        setAllComments(await commentService.getAll(postId))
        setIsUpdate(false)
      } catch (error) {
        console.log(error)
      }
  }


    const handleDeleteCommentSubmit = async (id) => {
      try {
        const result = window.confirm('Do you really want to delete this comment?')
        if(result){
            await commentService.deleteComment(id) 
            setAllComments(await commentService.getAll(postId))
        }
        return
      } catch (error) {
        console.error(error)
      }
    }

    const handleUpdateComment = comment => {
      if(isUpdate){
        return setIsUpdate(false)
      }
      setIsUpdate(true)
      setSelectedComment(comment)
      setMessageToUpdate(comment.message)
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
          <span className="px-6 text-sm"> 
            <span className="hover:text-indigo-300 hover:border-indigo-600 border-b border-gray-600 mx-2" onClick={handleDeleteCommentSubmit.bind(this, comment.id)}>Delete</span> 
            <span className="hover:text-indigo-300 hover:border-indigo-600 border-b border-gray-600"  onClick={handleUpdateComment.bind(this, comment)}>Edit</span> 
          </span>
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
            <CommentInput 
            isUpdate={isUpdate}
            onSubmitNew={handleCommentSubmit} 
            onSubmitUpdate={handleCommentUpdateSubmit} 
            newCommentValue={message} 
            commentUpdateValue={messageToUpdate}
            setMessage={setMessage} 
            setMessageToUpdate={setMessageToUpdate}
            >
            </CommentInput>
        </>
    )
}

export default CommentSection
