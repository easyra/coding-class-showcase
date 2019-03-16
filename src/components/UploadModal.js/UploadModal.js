import React, { Component } from 'react';
import M from 'materialize-css';
import { storageRef, databaseRef } from '../firebase';
import styled from 'styled-components';
import shortid from 'shortid';
import LoadingNode from '../Home/LoadingNode';
//import './inputColor.css';

class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameInput: '',
      periodInput: '',
      projectInput: '',
      linkInput: '',
      imgInput: '',
      imgFile: null,
      loading: false
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
  handleValidation = (fullName, period, link, imgFile, projectInput) => {
    if (!(fullName && period && imgFile && projectInput && link)) {
      alert('All fields must be completed.');
      return true;
    }
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(link)) {
      alert('Link must start with an https:// or http://');
      return true;
    }
    return false;
  };
  handleSubmit = event => {
    const id = databaseRef.push().key;
    this.setState({ loading: true });
    event.preventDefault();
    const {
      fullNameInput,
      periodInput,
      linkInput,
      imgFile,
      projectInput
    } = this.state;
    if (
      this.handleValidation(
        fullNameInput,
        periodInput,
        linkInput,
        imgFile,
        projectInput
      )
    ) {
      this.setState({ loading: false });
      return;
    }
    storageRef
      .child(`kimsclass/${id}`)
      .put(imgFile)
      .then(async () => {
        const img = await storageRef.child(`kimsclass/${id}`).getDownloadURL();
        let updateObject = {};
        const newProject = {
          title: fullNameInput,
          period: parseInt(periodInput),
          link: linkInput,
          projectTitle: projectInput,
          img
        };
        updateObject[
          `kimsclass-${projectInput}-period${periodInput}/${id}`
        ] = newProject;
        updateObject[`kimsclass-${projectInput}-all/${id}`] = newProject;
        await databaseRef.update(updateObject);
        const model = document.querySelector('#modal1');
        const instance = M.Modal.getInstance(model);
        this.setState({
          fullNameInput: '',
          linkInput: '',
          imgInput: '',
          loading: false,
          imgFile: null
        });
        instance.close();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { loading } = this.state;
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
                  className='validate uploadmodal'
                />
                <label for='full_name'>Full Name</label>
              </div>
              {/* Period */}
              <div class='input-field col s12'>
                <select
                  name='periodInput'
                  value={this.state.periodInput}
                  onChange={this.handleChange}
                  className='uploadmodal'
                >
                  <option value='' selected />
                  <option className='blue-text' value='1'>
                    Period 1
                  </option>
                  <option className='blue-text' value='2'>
                    Period 2
                  </option>
                  <option className='blue-text' value='3'>
                    Period 3
                  </option>
                  <option className='blue-text' value='4'>
                    Period 4
                  </option>
                  <option className='blue-text' value='5'>
                    Period 5
                  </option>
                  <option className='blue-text' value='6'>
                    Period 6
                  </option>
                </select>
                <label>Period: </label>
              </div>
              {/* Projects */}
              <div class='input-field col s12'>
                <select
                  name='projectInput'
                  value={this.state.projectInput}
                  onChange={this.handleChange}
                  className='uploadmodal'
                >
                  <option value='' selected />
                  {this.props.projectTitles.map(title => (
                    <option className='blue-text' value={title}>
                      {title}
                    </option>
                  ))}
                </select>
                <label>Projects: </label>
              </div>
              {/* Animation Link */}
              <div className='input-field col s12'>
                <input
                  name='linkInput'
                  value={this.state.linkInput}
                  onChange={this.handleChange}
                  id='project-link'
                  placeholder='Enter Here'
                  type='url'
                  className='uploadmodal'
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
                    className='uploadmodal'
                  />
                </div>
                <div class='file-path-wrapper'>
                  <input class='file-path validate' type='text' />
                </div>
              </div>

              {loading ? (
                <LoadingNode />
              ) : (
                <div
                  className='btn right waves-effect blue darken-3'
                  onClick={this.handleSubmit}
                >
                  Submit
                </div>
              )}
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
