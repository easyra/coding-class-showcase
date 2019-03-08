import React, { Component } from 'react';
import HomeList from './HomeList';
import Navigator from '../Navigator/Navigator';
import UploadModal from '../UploadModal.js/UploadModal';
import { databaseRef } from '../firebase';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  addProject = newProject => {
    const projects = this.state.projects.slice();
    projects.push(newProject);
    console.log(projects);
    this.setState({ projects });
  };
  render() {
    const { projects } = this.state;
    return (
      <div>
        <Navigator />
        <HomeList projects={projects} />
        <UploadModal addProject={this.addProject} />
      </div>
    );
  }
  componentDidMount() {
    databaseRef.child('kimsclass').on('value', snapshot => {
      this.setState({ projects: Object.values(snapshot.val()) });
    });
  }
}

export default HomeContainer;
