import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomeContainer from './components/Home/HomeContainer.js';
import SetRoomContainer from './components/SetRoom/SetRoomContainer.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact strict path='/' render={props => <SetRoomContainer />} />
          <Route
            path='/:className'
            render={props => <HomeContainer {...props} />}
          />
          <Route
            path='/:className/admin'
            render={props => <HomeContainer admin={true} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
