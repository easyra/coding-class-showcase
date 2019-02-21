import React, { Component } from 'react';
import HomeCard from './HomeCard';

const HomeList = props => {
  const { projects } = props;
  return (
    <div className='row container'>
      {projects.map(project => (
        <HomeCard
          title={project.title}
          img={project.img}
          link={project.link}
          period={project.period}
        />
      ))}
    </div>
  );
};

export default HomeList;
