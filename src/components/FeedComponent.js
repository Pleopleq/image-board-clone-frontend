import React, { useEffect, useState } from 'react'
import CommentSection from './CommentSection'
import postsService from '../services/posts'
const baseUrl = 'http://localhost:3001/'

const FeedComponent = ({allPosts, deletedPost}) => {
    const [user, setUser] = useState(null)
    const handleDeletedPost = deletedPost
    
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        postsService.setToken(user.token)
      }
    }, [])

    const handleDeletePost = async (id) => {
      await postsService.deletePost(id)
      handleDeletedPost()
    }

    const handleShowButtons = (post) => {
      const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      if (!user){
        return null
      } else if(loggedUser.username !== post.author){
        return null
      }

      return (
          <>
          <button className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2" onClick={handleDeletePost.bind(this,post.id)}>Delete</button>
          <button className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2" onClick={() => console.log('EDIT')}>Edit</button>
          </>
      )
    } 

    const handlePostWithoutImage = (post) => {
      if(post.postImage === undefined){
        return <br/>
      }
      return <img src={baseUrl+post.postImage} className="px-2 object-cover mb-5"></img>
    }

    const handleCommentsInput = (postId, post) => {
      if(!user){
        return (
          
          post.replies.map((comment, index) => 
          <ul className="px-4 divide-y divide-gray-400">
            <li key={index} className="bg-indigo-100 font-light text-gray-700 py-2">
              {comment.message} - <span className="font-bold">{comment.author}</span>
            </li>
          </ul>
          ))
      }
      return <CommentSection id={postId}></CommentSection>
    }

    return (
        allPosts.map(post => 
        <div key={post.id} className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 px-4 mt-4 mb-5 bg-indigo-100">
          <h2 className="text-3xl px-2 font-bold">{post.title}</h2>
          <p className="px-2 py-2">{post.id}</p>
          {handlePostWithoutImage(post)}
          <p className="font-bold text-purple-500 text-xl-mb-2 px-5">Author: {post.author}</p>
          <p className="py-3 px-5 break-words">{post.content}</p>
          <div className="m-3">
          {handleShowButtons(post)}
          </div>
          <div>
            <h3 className="text-2xl font-bold px-4 ">Comments</h3>
            {handleCommentsInput(post.id, post)}
          </div>
        </div>
        )
    )
}

export default FeedComponent