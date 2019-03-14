/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { databaseRef } from '../firebase';
import NavProjectTitle from './NavProjectTitle';
import M from 'materialize-css';

class NavContent extends Component {
  state = {
    projectTitles: []
  };

  openModal = () => {
    const model = document.querySelector('#modal1');
    const instance = M.Modal.getInstance(model);
    instance.isOpen ? instance.close() : instance.open();
  };
  render() {
    return (
      <ul className='right'>
        {this.state.projectTitles.map((title, i) => (
          <NavProjectTitle
            key={i}
            id={i}
            title={title}
            changeProjectsDisplayed={this.props.changeProjectsDisplayed}
          />
        ))}
        <li>
          <a onClick={this.openModal}>
            <i className='left material-icons'>file_upload</i>Upload
          </a>
        </li>
      </ul>
    );
  }
  componentDidMount() {
    databaseRef.child('kimsclass-projecttitles').on('value', snapshot => {
      const projectTitles = snapshot.val();
      if (projectTitles) {
        this.setState({ projectTitles: Object.keys(projectTitles) });
      }
    });
  }
}

export default NavContent;
