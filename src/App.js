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

  useEffect(() => {
    postsService.getAll().then(posts => {
        setAllPost(posts)
    })
  }, [])
  
  const FeedComponentWrapper = () => {
    return <FeedComponent allPosts={allPosts.reverse()}></FeedComponent>
  }

  return (
    <Router>
    <div className="App">
        <Navbar ></Navbar>
        <NewPost></NewPost>
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
