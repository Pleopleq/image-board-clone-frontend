import React, { useEffect, useState } from 'react'
import postsService from '../services/posts'
const baseUrl = 'http://localhost:3001/'

const FeedComponent = () => {
    const [allPosts , setAllPost] = useState([])
    useEffect(() => {
    postsService.getAll().then(posts => {
        setAllPost(posts)
    })
    }, [])

    return (
        allPosts.map(post => 
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.id}</p>
          <img src={baseUrl+post.postImage}></img>
          <p>author: {post.author}</p>
          <p>{post.content}</p>
          <div>
              <h3>Comments</h3>
          <ul>
              {post.replies.map((comment, index) => 
              <li key={index}>{comment.message} - {comment.author}</li>
              )}
          </ul>
          </div>
        </div>
        )
    )
}

export default FeedComponent