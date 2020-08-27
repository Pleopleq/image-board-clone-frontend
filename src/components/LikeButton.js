import React, { useState, useEffect } from 'react'
import postsService from '../services/posts'
import heart from '../assets/corazon.svg'

const LikeButton = ({post}) => {
    const [likes, setLikes] = useState(0)
    
    useEffect(() => {
      setLikes(post.likes) 
    }, [post])
  
    const handleLikeButton = async (id) => {
      try {
        const likedPost = await postsService.getOne(id)
        ++likedPost.likes
        await postsService.likeAPost(id, likedPost)
        setLikes(likedPost.likes)
      } catch (error) {
        console.log(error)
      }
    }
  
    return(
      <div className="content-between">
      <button
      onClick={handleLikeButton.bind(this, post.id)}
      className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
      >
      <img className="w-6" src={heart} alt="Heart from like button"></img>
      <span>{likes}</span>
      </button>
      </div>
    )
  }

  export default LikeButton