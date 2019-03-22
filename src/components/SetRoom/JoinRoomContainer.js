import React, { Component } from 'react';
import TextInput from '../ReusableComponents/TextInput';
import { withRouter } from 'react-router-dom';
import { databaseRef } from '../firebase';
import bcrypt from 'bcryptjs';

class JoinRoomContainer extends Component {
  state = {
    roomIdInput: '',
    passwordInput: ''
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { roomIdInput, passwordInput } = this.state;
    const { history } = this.props;
    const roomId = roomIdInput.toLowerCase();
    databaseRef.child(`rooms/${roomId}`).on('value', async snapshot => {
      if (snapshot.exists()) {
        const hash = snapshot.val();
        if (hash) {
          bcrypt.compareSync(passwordInput, hash)
            ? history.push(roomId)
            : alert('password is incorrect');
        } else {
          history.push(roomId);
        }
      } else {
        alert(`Room doesn't exist`);
      }
    });
  };
  render() {
    const { roomIdInput, passwordInput } = this.state;
    return (
      <div className='container'>
        <h4 className=''>Enter Room Id Here:</h4>
        <div className='row'>
          <TextInput
            placeholder='ex: msmcgee2019'
            id='roomId'
            size={6}
            label='Room ID'
            inputName='roomIdInput'
            inputValue={roomIdInput}
            handleChange={this.handleChange}
          />
          <TextInput
            placeholder='*password'
            id='password'
            size={6}
            label='Password'
            inputName='passwordInput'
            inputValue={passwordInput}
            handleChange={this.handleChange}
          />
        </div>
        <a
          className={`waves-effect waves-light btn blue darken-3 ${
            roomIdInput && passwordInput ? '' : 'disabled'
          }`}
          onClick={this.handleSubmit}
        >
          Submit
        </a>
      </div>
    );
  }
}

export default withRouter(JoinRoomContainer);
