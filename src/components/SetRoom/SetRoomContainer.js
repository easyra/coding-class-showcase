import React, { Component } from 'react';
import SetRoomNavBar from './SetRoomNavBar';
import ChooseRoomContainer from './ChooseRoomContainer';
import JoinRoomContainer from './JoinRoomContainer';
import CreateRoomContainer from './CreateRoomContainer';

class SetRoomContainer extends Component {
  state = {
    currentRoom: 0
  };
  changeRoom = n => {
    this.setState({ currentRoom: n });
  };
  render() {
    const { currentRoom } = this.state;
    return (
      <>
        <SetRoomNavBar />
        {(currentRoom === 0 || currentRoom > 2) && (
          <ChooseRoomContainer changeRoom={this.changeRoom} />
        )}
        {currentRoom === 1 && (
          <JoinRoomContainer changeRoom={this.changeRoom} />
        )}
        {currentRoom === 2 && (
          <CreateRoomContainer changeRoom={this.changeRoom} />
        )}
      </>
    );
  }
}

export default SetRoomContainer;
