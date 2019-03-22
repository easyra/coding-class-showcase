import React, { Component } from 'react';
import ChooseRoomBtn from './ChooseRoomBtn';

class ChooseRoomContainer extends Component {
  render() {
    const { changeRoom } = this.props;
    return (
      <div className='container'>
        <h4 className='center'>Show off your hard work!</h4>
        <div className='center'>
          <ChooseRoomBtn changeRoom={changeRoom} title={'Join Room'} />
          <ChooseRoomBtn changeRoom={changeRoom} title={'Create Room'} />
        </div>
      </div>
    );
  }
}

export default ChooseRoomContainer;
