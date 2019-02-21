import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './components/Home/HomeContainer.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route path='/' render={props => <HomeContainer {...props} />} />
      </div>
    );
  }
}

export default App;
