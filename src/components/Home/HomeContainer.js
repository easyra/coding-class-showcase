import React, { PureComponent } from 'react';
import HomeList from './HomeList';
import Navigator from '../Navigator/Navigator';
import UploadModal from '../UploadModal.js/UploadModal';
import { databaseRef } from '../firebase';
import SelectBar from '../Navigator/SelectBar';
import M from 'materialize-css';

class HomeContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      uploadModalOn: false,
      listLoading: true,
      activePeriod: 0,
      activeProject: 0,
      projectTitles: []
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
    const { className } = this.props.match.params;
    if (notMounting) {
      this.setState({ listLoading: true });
    }
    if (periodIndex === 'default') {
      periodIndex = this.state.activePeriod;
    }
    if (projectIndex === 'default') {
      projectIndex = this.state.activeProject;
    }

    databaseRef.on('value', snapshot => {
      const periodString = periodIndex === 0 ? 'all' : `period${periodIndex}`;
      const projectTitlesSnapshot = snapshot.child(
        `${className}-projecttitles`
      );
      const projectTitles = projectTitlesSnapshot.exists()
        ? Object.keys(projectTitlesSnapshot.val())
        : [];
      const projectTitle = projectTitles[projectIndex];
      const projectPath = snapshot.child(
        `${className}-${projectTitle}-${periodString}`
      );
      const projects = projectPath.exists()
        ? Object.values(projectPath.val())
        : [];
      const newState = {
        projects,
        backupProjects: projects,
        listLoading: false,
        activePeriod: periodIndex,
        activeProject: projectIndex
      };
      if (!notMounting) {
        newState.projectTitles = projectTitles;
        newState.uploadModalOn = true;
      }
      this.setState(newState);
      M.AutoInit();
    });
  };
  render() {
    const {
      projects,
      activePeriod,
      activeProject,
      uploadModalOn,
      projectTitles,
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
          projectTitle={projectTitles[activeProject]}
          activePeriod={activePeriod}
        />
        <HomeList
          {...this.props}
          projects={projects}
          listLoading={listLoading}
          activePeriod={activePeriod}
        />
        {uploadModalOn && (
          <UploadModal
            addProject={this.addProject}
            projectTitles={projectTitles}
            listLoading={listLoading}
          />
        )}
      </div>
    );
  }
  componentDidMount = () => {
    const { activeProject, activePeriod } = this.state;
    this.changeProjectsDisplayed(activePeriod, activeProject, false);
  };
}

export default HomeContainer;
