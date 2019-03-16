import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomeContainer from './components/Home/HomeContainer.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Route
          path='/:className'
          render={props => <HomeContainer {...props} />}
        />
      </div>
    );
  }
}

export default App;
