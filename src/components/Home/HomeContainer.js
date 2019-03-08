import React, { Component } from 'react';
import HomeList from './HomeList';
import Navigator from '../Navigator/Navigator';
import UploadModal from '../UploadModal.js/UploadModal';
import { databaseRef } from '../firebase';
import SelectBar from '../Navigator/SelectBar';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      activePeriod: 0
    };
  }
  changePeriod = n => {
    if (n === 0) {
      //Resets list
      this.setState({ activePeriod: n, projects: this.state.backupProjects });
    } else {
      const projects = this.state.backupProjects
        .slice()
        .filter(project => project.period === n);
      this.setState({ activePeriod: n, projects });
    }
  };
  addProject = newProject => {
    const projects = this.state.projects.slice();
    projects.push(newProject);
    console.log(projects);
    this.setState({ projects });
  };
  render() {
    const { projects, activePeriod } = this.state;
    return (
      <div>
        <Navigator />
        <SelectBar
          activePeriod={activePeriod}
          changePeriod={this.changePeriod}
        />
        <HomeList projects={projects} />
        <UploadModal addProject={this.addProject} />
      </div>
    );
  }
  componentDidMount() {
    databaseRef.child('kimsclass').on('value', snapshot => {
      const projects = Object.values(snapshot.val());
      this.setState({ projects, backupProjects: projects });
    });
  }
}

export default HomeContainer;
