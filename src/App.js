import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import FeedComponent from './components/FeedComponent'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <Router>
    <div className="App">
        <Navbar></Navbar>
        <Switch>
        <Route path="/" exact component={FeedComponent}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
