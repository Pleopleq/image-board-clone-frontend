import React from 'react';
import FeedComponent from './components/FeedComponent'
import Navbar from './components/Navbar'

const App = () => {
  return (

    <div className="App">
        <Navbar></Navbar>
        <FeedComponent></FeedComponent>
    </div>
  );
}

export default App;
