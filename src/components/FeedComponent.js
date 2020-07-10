import React, { useEffect, useState } from 'react'
import postsService from '../services/posts'
const baseUrl = 'http://localhost:3001/'

/*
const Comments = ({ id, index }) => {
    const [allComments, setAllComments] = useState([])
    useEffect(() => {
    postsService.getAllComments(id).then(comments => {
        setAllComments(comments)
    })
    }, [index])
    console.log(allComments)
    return (
            <p key={index}>{allComments}</p>
    )
}
*/

const FeedComponent = () => {
    const [allPosts , setAllPost] = useState([])
    useEffect(() => {
    postsService.getAll().then(posts => {
        setAllPost(posts)
    })
    }, [])

    return (
        allPosts.map((post, index)=> 
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.id}</p>
          <img src={baseUrl+post.postImage}></img>
          <p>author: {post.author}</p>
          <p>{post.content}</p>
        </div>
        )
    )
}

export default FeedComponent