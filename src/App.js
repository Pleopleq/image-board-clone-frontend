import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import postsService from './services/posts'
import Notification from './components/Notification'
import Login from './components/Login'
import Register from './components/Register'
import FeedComponent from './components/FeedComponent'
import MostLiked from './components/MostLiked'
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'
import SinglePost from './components/SinglePost'
import EditPost from './components/EditPost'

const App = () => {
  const [allPosts , setAllPost] = useState([])
  const [success, setSuccess] = useState('')
  const [successClass, setSuccessClass] = useState(null)

  const fetchingPosts = async () => {
    const result = await postsService.getAll()
    setAllPost(result.reverse())
  }    

  const handleNewPostAdded = (addedPost) => {
    const copyOfAllPosts = [addedPost, ...allPosts]
    setAllPost(copyOfAllPosts)
  }
  
  const handleNotificationsSuccess = (message, success) => {
    setSuccess(message)
    setSuccessClass(success)
    setTimeout(() => {
      setSuccess(null)
      setSuccessClass(null)
    }, 3000);
  }

  useEffect(() => {
      fetchingPosts()
    }, [])

  const MostLikedWrapper = () => {
    return <MostLiked posts={allPosts}></MostLiked>
  }

  const FeedComponentWrapper = () => {
    return( 
    <>
    <NewPost allPosts={handleNewPostAdded}></NewPost>
    <Notification message={success} className={successClass}></Notification>
    <FeedComponent allPosts={allPosts} deletedPost={fetchingPosts} success={handleNotificationsSuccess}></FeedComponent>
    </>
    )
  }

  const EditPostWrapper = () => {
    return <EditPost updateFeed={setAllPost}></EditPost>
  }

  return (
    <Router>
    <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact component={FeedComponentWrapper}/>
          <Route path="/mostliked" component={MostLikedWrapper}/>
          <Route path="/post/:id" component={SinglePost}/>
          <Route path="/edit/:id" component={EditPostWrapper}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
