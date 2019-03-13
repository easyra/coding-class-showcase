import React, { Component } from 'react';
import HomeList from './HomeList';
import Navigator from '../Navigator/Navigator';
import UploadModal from '../UploadModal.js/UploadModal';
import { databaseRef } from '../firebase';
import SelectBar from '../Navigator/SelectBar';
import { UploadModalOn } from '../Context';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      uploadModalOn: true,
      listLoading: true,
      activePeriod: 0
    };
  }

  changeHomeContainerState = object => {
    this.setState(object);
  };

  changeListLoadingState = bool => {
    this.setState({ listLoading: bool });
  };

  toggleUploadModal = () => {
    this.setState(prev => {
      return { uploadModalOn: !prev.uploadModalOn };
    });
  };

  changeProjectState = projects => {
    this.setState({ projects, backupProjects: projects });
  };
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
    this.setState({ projects });
  };
  render() {
    const { projects, activePeriod, uploadModalOn, listLoading } = this.state;
    return (
      <div>
        <Navigator
          toggleUploadModal={this.toggleUploadModal}
          uploadModalOn={this.uploadModalOn}
        />
        <SelectBar
          changeProjectState={this.changeProjectState}
          activePeriod={activePeriod}
          changePeriod={this.changePeriod}
          changeListLoadingState={this.changeListLoadingState}
        />
        <HomeList projects={projects} listLoading={listLoading} />
        {uploadModalOn && <UploadModal addProject={this.addProject} />}
      </div>
    );
  }
  componentDidMount() {
    const period = this.state.activePeriod;
    const periodString = period === 0 ? 'all' : `period${period}`;
    const project = 'project1';
    const rootPath = `kimsclass-${project}-${periodString}`;
    databaseRef.child(rootPath).on('value', snapshot => {
      const projects = snapshot.exists() ? Object.values(snapshot.val()) : [];
      this.setState({ projects, backupProjects: projects, listLoading: false });
    });
  }
}

export default HomeContainer;
