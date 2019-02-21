import React, {Component} from 'react';
import HomeCard from './HomeCard';

const HomeList = props => {
  const {projects} = props;
  return(
  <div>
    {projects.map(project => <HomeCard project = {project}/>)}
  </div>
  )
}

export default HomeList;