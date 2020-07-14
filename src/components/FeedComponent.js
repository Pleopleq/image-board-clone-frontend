import React, { useEffect, useState } from 'react'
import CommentSection from './CommentSection'
import postsService from '../services/posts'
const baseUrl = 'http://localhost:3001/'

const FeedComponent = () => {
    const [allPosts , setAllPost] = useState([])
    const [user, setUser] = useState(null)
    
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        postsService.setToken(user.token)
      }
    }, [])

    useEffect(() => {
      postsService.getAll().then(posts => {
          setAllPost(posts)
      })
      }, [])

    const handleCommentsInput = (postId, post) => {
      if(!user){
        return (
          post.replies.map((comment, index) => 
          <li key={index} className="bg-indigo-100 font-light text-gray-700 py-2">
            {comment.message} - <span className="font-bold">{comment.author}</span>
          </li>
          ))
      }
      return <CommentSection id={postId}></CommentSection>
    }

    return (
        allPosts.map(post => 
        <div key={post.id} className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 mt-4 mb-5 bg-indigo-100">
          <h2 className="text-3xl px-2 font-bold">{post.title}</h2>
          <p className="px-2 py-2">{post.id}</p>
          <img src={baseUrl+post.postImage} className="px-2 object-cover mb-5"></img>
          <p className="font-bold text-purple-500 text-xl-mb-2 px-5">Author: {post.author}</p>
          <p className="py-3 px-5 break-words">{post.content}</p>
          <div>
            <h3 className="text-2xl font-bold px-4 ">Comments</h3>
          <ul className="px-4 divide-y divide-gray-400">
            {handleCommentsInput(post.id, post)}
          </ul>
          </div>
        </div>
        )
    )
}

export default FeedComponent