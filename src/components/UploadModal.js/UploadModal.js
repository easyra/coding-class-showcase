import React, { Component } from 'react';
import M from 'materialize-css';
import { storageRef, databaseRef } from '../firebase';
import styled from 'styled-components';
import shortid from 'shortid';
//import './inputColor.css';

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameInput: '',
      periodInput: '',
      linkInput: '',
      imgInput: '',
      imgFile: null
    };
  }
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleFiles = e => {
    const file = e.currentTarget.files[0];
    console.log(file instanceof File);
    this.setState({ [e.currentTarget.name]: e.target.value, imgFile: file });
  };
  handleSubmit = event => {
    const id = databaseRef.push().key;
    event.preventDefault();
    const { fullNameInput, periodInput, linkInput, imgFile } = this.state;

    storageRef
      .child(`kimsclass/${id}`)
      .put(imgFile)
      .then(async () => {
        const img = await storageRef.child(`kimsclass/${id}`).getDownloadURL();
        const newProject = {
          title: fullNameInput,
          period: parseInt(periodInput),
          link: linkInput,
          img
        };
        await databaseRef.child(`kimsclass/${id}`).set(newProject);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id='modal1' class='modal'>
        <div class='modal-content'>
          <div className='row'>
            <form action='#'>
              {/* Full Name */}
              <div className='input-field col s12'>
                <input
                  value={this.state.fullNameInput}
                  onChange={this.handleChange}
                  name='fullNameInput'
                  id='full_name'
                  placeholder='Enter Here'
                  type='text'
                  className='validate'
                />
                <label for='full_name'>Full Name</label>
              </div>
              {/* Period */}
              <div class='input-field col s12'>
                <select
                  name='periodInput'
                  value={this.state.periodInput}
                  onChange={this.handleChange}
                >
                  <option value='' selected />
                  <option value='1'>Period 1</option>
                  <option value='2'>Period 2</option>
                  <option value='3'>Period 3</option>
                  <option value='4'>Period 4</option>
                  <option value='5'>Period 5</option>
                  <option value='6'>Period 6</option>
                </select>
                <label>Period: </label>
              </div>
              {/* Animation Link */}
              <div className='input-field col s12'>
                <input
                  name='linkInput'
                  value={this.state.linkInput}
                  onChange={this.handleChange}
                  id='project-link'
                  placeholder='Enter Here'
                  type='text'
                  className='validate'
                />
                <label for='project-link'>Project link</label>
              </div>
              {/* Img Link */}
              <div class='file-field input-field col s12'>
                <div class='btn blue darken-3'>
                  <span>File</span>
                  <input
                    type='file'
                    name='imgInput'
                    value={this.state.imgInput}
                    accept='.png,.jpg,.jpeg'
                    onChange={this.handleFiles}
                  />
                </div>
                <div class='file-path-wrapper'>
                  <input class='file-path validate' type='text' />
                </div>
              </div>

              <div
                className='btn right waves-effect blue darken-3'
                onClick={this.handleSubmit}
              >
                Submit
              </div>
              {/* <input
                  type='submit'
                  value='Submit'
                  className='btn right waves-effect blue darken-3'
                  onSubmit={this.handleSubmit}
                /> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const options = { opacity: 0.5, preventScrolling: true };
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, options);
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

export default UploadModal;
