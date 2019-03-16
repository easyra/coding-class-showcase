/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
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
    const { projectTitles } = this.state;
    return (
      <>
        <ul id='dropdown1' class='dropdown-content' disabled={!projectTitles}>
          {projectTitles.map((title, i) => (
            <NavProjectTitle
              key={i}
              id={i}
              title={title}
              changeProjectsDisplayed={this.props.changeProjectsDisplayed}
            />
          ))}
        </ul>
        <ul className='right'>
          <li>
            <a class='dropdown-trigger' href='#!' data-target='dropdown1'>
              Projects<i class='material-icons right'>arrow_drop_down</i>
            </a>
          </li>

          <li>
            <a onClick={this.openModal}>
              <i className='left material-icons'>file_upload</i>Upload
            </a>
          </li>
        </ul>
      </>
    );
  }
  componentDidMount() {
    const { className } = this.props.match.params;
    databaseRef.child(`${className}-projecttitles`).on('value', snapshot => {
      const projectTitles = snapshot.val();
      if (projectTitles) {
        this.setState({ projectTitles: Object.keys(projectTitles) });
      }
    });
  }
}

export default withRouter(NavContent);
