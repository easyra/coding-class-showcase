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
      activePeriod: 0,
      activeProject: 0
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
  changeProjectsDisplayed = (periodIndex, projectIndex, notMounting) => {
    if (notMounting) {
      this.setState({ listLoading: true });
    }
    if (periodIndex === 'default') {
      periodIndex = this.state.activePeriod;
    }
    if (projectIndex === 'default') {
      projectIndex = this.state.activeProject;
    }
    console.log(periodIndex);
    console.log(projectIndex);

    databaseRef.on('value', snapshot => {
      const periodString = periodIndex === 0 ? 'all' : `period${periodIndex}`;
      const projectTitle = Object.keys(
        snapshot.child('kimsclass-projecttitles').val()
      )[projectIndex];
      const projectPath = snapshot.child(
        `kimsclass-${projectTitle}-${periodString}`
      );
      const projects = projectPath.exists()
        ? Object.values(projectPath.val())
        : [];
      this.setState({
        projects,
        backupProjects: projects,
        listLoading: false,
        activePeriod: periodIndex,
        activeProject: projectIndex
      });
    });
  };
  render() {
    const {
      projects,
      activePeriod,
      activeProject,
      uploadModalOn,
      listLoading
    } = this.state;
    return (
      <div>
        <Navigator
          toggleUploadModal={this.toggleUploadModal}
          uploadModalOn={this.uploadModalOn}
          changeProjectsDisplayed={this.changeProjectsDisplayed}
        />
        <SelectBar
          changeProjectsDisplayed={this.changeProjectsDisplayed}
          activePeriod={activePeriod}
        />
        <HomeList projects={projects} listLoading={listLoading} />
        {uploadModalOn && <UploadModal addProject={this.addProject} />}
      </div>
    );
  }
  componentDidMount = () => {
    const { activeProject, activePeriod } = this.state;
    this.changeProjectsDisplayed(activePeriod, activeProject, false);
  };
}

export default HomeContainer;
