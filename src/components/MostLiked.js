import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import postsService from '../services/posts'
const baseUrl = 'http://localhost:3001/'

const MostLiked = () => {
    const [allPosts, setAllPost] = useState([])

    const fetchingPosts = async () => {
        const result = await postsService.getAll()
        setAllPost(result.reverse())
      }    

    useEffect(() => {
        fetchingPosts()
      }, [])
  
    
    const mostLikedPosts = 
        allPosts.sort( (a, b) => {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      })

    const handlePostWithoutImage = (post) => {
    if(post.postImage === undefined){
        return <br/>
    }
    return <img src={baseUrl+post.postImage} className="px-2 object-cover mb-5" alt="Post thumbnail"></img>
    }

    return (
        mostLikedPosts.map( (post, index) => 
            <div key={index} className="max-w-sm rounded overflow-hidden shadow hover:shadow-xl flex flex-col container mx-auto py-3 px-4 mt-4 mb-5 bg-indigo-100">
                <h1 className="text-2xl px-2 py-2 font-bold">{post.title}</h1>
                {handlePostWithoutImage(post)}
                <p className="font-bold text-purple-500 text-xl-mb-2 px-5">Posted by: {post.author}</p>
                <p className="font-bold text-red-500 text-xl-mb-2 px-5">Likes: {post.likes}</p>
                <p className="py-3 px-5 break-words">{post.content}</p>
                <Link to={'/post/'+post.id} className="font-bold bg-indigo-200 hover:bg-indigo-400 text-center">
                  <button>Go to this post</button>
                </Link>
            </div>
        )
    )
}

export default MostLiked