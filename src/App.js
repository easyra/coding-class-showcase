import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';
import HomeCard from './components/Home/HomeCard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/home" render={props => <HomeCard {...props}/>}/>
      </div>
    );
  }
}

export default App;
