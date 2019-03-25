import React, { Component } from 'react';
import TextInput from '../ReusableComponents/TextInput';
import { databaseRef } from '../firebase';
import bcrypt from 'bcryptjs';
import { withRouter } from 'react-router-dom';
import LoadingNode from '../ReusableComponents/LoadingNode';

class CreateRoomContainer extends Component {
  state = {
    roomIdInput: '',
    passwordInput: '',
    roomTitleInput: '',
    roomUrlInput: '',
    urlExists: false,
    project1Input: '',
    project2Input: '',
    project3Input: '',
    loading: false
  };
  handleChange = async (name, value) => {
    if (name === 'roomIdInput') {
      const roomUrlInput = value.replace(/\s/g, '-').toLowerCase();
      const newState = { roomIdInput: value, roomUrlInput: roomUrlInput };
      this.setState(newState);
      //Checks if URL exists in RealTime Database
      const urlExists = (await databaseRef
        .child(`rooms/${roomUrlInput}`)
        .once('value')).exists();
      this.setState({ urlExists });
    } else {
      this.setState({ [name]: value });
    }
  };
  handleSubmit = async () => {
    const {
      roomIdInput,
      passwordInput,
      roomTitleInput,
      roomUrlInput,
      project1Input,
      project2Input,
      project3Input
    } = this.state;

    const projectTitles = [project1Input, project2Input, project3Input];
    this.setState({ loading: true });

    const urlExists = (await databaseRef
      .child(`rooms/${roomUrlInput}`)
      .once('value')).exists();

    if (urlExists) {
      this.setState({ loading: false });
      alert('Url is already taken');
      return;
    }

    //Stores room password as a hash if passwordInput has value
    const updateObject = {};
    updateObject[`rooms/${roomUrlInput}`] = passwordInput
      ? await bcrypt.hash(passwordInput, 14)
      : false;
    projectTitles.forEach(title => {
      if (title) {
        updateObject[`${roomUrlInput}-projecttitles/${title}`] = true;
      }
    });
    updateObject[`${roomUrlInput}-info/title`] = roomTitleInput;
    databaseRef
      .update(updateObject)
      .then(() => {
        this.props.history.push(roomUrlInput);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const {
      roomIdInput,
      passwordInput,
      roomTitleInput,
      roomUrlInput,
      project1Input,
      project2Input,
      project3Input,
      loading
    } = this.state;
    return (
      <div className='container'>
        <h4>Create a Room:</h4>
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
          <h5 className='grey-text lighten-3'>\{roomUrlInput}</h5>
        </div>

        <div className='row'>
          <TextInput
            placeholder="Ms McGee's Class"
            id='roomTitle'
            size={6}
            label='Room Title'
            inputName='roomTitleInput'
            inputValue={roomTitleInput}
            handleChange={this.handleChange}
          />
          <TextInput
            placeholder='Optional'
            id='password'
            size={6}
            label='Password'
            inputName='passwordInput'
            inputValue={passwordInput}
            handleChange={this.handleChange}
          />
        </div>
        <div className='row'>
          <TextInput
            placeholder='Ex:The Great Math Project'
            id='project-1'
            size={4}
            label='Project 1'
            inputName='project1Input'
            inputValue={project1Input}
            handleChange={this.handleChange}
          />
          <TextInput
            placeholder='Ex:The Great Math Project'
            id='project-2'
            size={4}
            label='Project 2'
            inputName='project2Input'
            inputValue={project2Input}
            handleChange={this.handleChange}
          />
          <TextInput
            placeholder='Ex:The Great Math Project'
            id='project-3'
            size={4}
            label='Project 3'
            inputName='project3Input'
            inputValue={project3Input}
            handleChange={this.handleChange}
          />
        </div>
        {loading ? (
          <LoadingNode />
        ) : (
          <a
            className={`waves-effect waves-light btn blue darken-3 ${
              roomIdInput &&
              roomTitleInput &&
              (project1Input || project2Input || project3Input)
                ? ''
                : 'disabled'
            }`}
            onClick={this.handleSubmit}
          >
            Submit
          </a>
        )}
      </div>
    );
  }
  componentDidMount = () => {
    databaseRef.child('rooms').on('value', () => {});
  };
}

export default withRouter(CreateRoomContainer);
