import React, { useEffect, useState } from 'react'
import postsService from '../services/posts'
import LikeButton from './LikeButton'
import CommentSection from './CommentSection'
import { useParams, Link } from "react-router-dom";
const baseUrl = 'https://desolate-anchorage-55331.herokuapp.com/'


const SinglePost = () => {
    const [post, setPost] = useState([])
    const { id } = useParams()
    const [user, setUser] = useState(null)

    const fetchingPost = async () => {
        const result = await postsService.getOne(id)
        setPost(result)
    }

    useEffect(() => {
        fetchingPost()
    }, [])

    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if(loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        postsService.setToken(user.token)
      }
    }, [])

    const handleDeletePost = async (id) => {
      const result = window.confirm('Do you really want to delete this post?')
      if(result){
        const resultAsync = Promise.all(
          await postsService.deletePost(id),
          /* await handleDeletedPost() */
        )
        
        if(resultAsync){
/*           success('Post has been deleted.', "flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 mx-24 rounded") 
 */          console.log('adsfasdf')
        }
      }
      return
    }

  const handleShowButtons = () => {
      const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      if (!user){
        return null
      } else if(loggedUser.username !== post.author){
        return null
      }

      return (
          <div className="ml-auto">
          <button className="inline-block bg-red-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-red-700 " onClick={handleDeletePost.bind(this, post.id)}>Delete</button>
          <Link to={'/edit/'+post.id}><button className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 ">Edit</button></Link>
          </div>
      )
    } 

    const handlePostWithoutImage = () => {
      if(post.postImage === undefined){
        return <br/>
      }
      return <img src={baseUrl+post.postImage} className="px-2 object-cover mb-5" alt="Post thumbnail"></img>
    }

    const handleCommentsInput = () => {
      console.log(post)
          if(!user){
            if (post.replies){
              return (
                post.replies.map((comment, index) => 
                <ul  key={index} className="px-4 divide-y divide-gray-400">
                  <li key={comment.id} className="bg-indigo-100 font-light text-gray-700 py-2">
                    {comment.message} - <span className="font-bold">{comment.author}</span>
                  </li>
                </ul>
                )
              )
            }
          } else {
            return <CommentSection id={post.id}></CommentSection>
          }
    }

    return (
        <div className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 px-4 mt-4 mb-5 bg-indigo-100">
          <h2 className="text-3xl px-2 py-2 font-bold">{post.title}</h2>
           {handlePostWithoutImage()} 
          <p className="font-bold text-purple-500 text-xl-mb-2 px-5">Author: {post.author}</p>
          <p className="py-3 px-5 break-words">{post.content}</p>

          <div className="flex items-end m-3">
            <LikeButton post={post}></LikeButton>
            {handleShowButtons()}
          </div>
          <div>
            <h3 className="text-2xl font-bold px-4 ">Comments</h3>
              {handleCommentsInput()}
          </div>
        </div>
    )
}

export default SinglePost