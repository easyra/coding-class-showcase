import React, {Component} from 'react';
import HomeList from './HomeList';

class HomeContainer extends Component{
  constructor(props) {
    this.state = {
      projects: []
    }
  }
  render(){
    const {projects} = this.state;
    return(
      <div>
        <HomeList projects={projects}/>
      </div>
    )
  }
}

export default HomeContainer;