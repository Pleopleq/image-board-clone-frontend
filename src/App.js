import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import postsService from './services/posts'
import Login from './components/Login'
import Register from './components/Register'
import FeedComponent from './components/FeedComponent'
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'

const App = () => {
  const [allPosts , setAllPost] = useState([])

  const fetchingPosts = async () => {
    const result = await postsService.getAll()
    setAllPost(result.reverse())
  }

  const handleNewPostAdded = (addedPost) => {
    const copyOfAllPosts = [addedPost, ...allPosts]
    setAllPost(copyOfAllPosts)
  }

  useEffect(() => {
      fetchingPosts()
    }, [])

  const FeedComponentWrapper = () => {
    return( 
    <>
    <NewPost allPosts={handleNewPostAdded}></NewPost>
    <FeedComponent allPosts={allPosts}></FeedComponent>
    </>
    )
  }

  return (
    <Router>
    <div className="App">
        <Navbar></Navbar> 
        <Switch>
        <Route path="/" exact component={FeedComponentWrapper}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
