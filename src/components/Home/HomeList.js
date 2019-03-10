import React, { Component } from 'react';
import HomeCard from './HomeCard';

const HomeList = props => {
  const { projects } = props;
  function createRows() {
    console.log(projects.length);
    let parent = [];
    for (let i = projects.length / 4; i > 0; i--) {
      let children = [];
      let startIndex = i * 4 - 1;
      for (let j = startIndex; j > startIndex - 4; j--) {
        console.log(j);
        if (projects[j]) {
          children.push(
            <HomeCard
              className='right'
              title={projects[j].title}
              img={projects[j].img}
              link={projects[j].link}
              period={projects[j].period}
            />
          );
        }
      }
      parent.push(
        <div className='row valign-wrapper container'>{children}</div>
      );
    }
    console.log(parent);
    return parent;
  }
  return <>{createRows()}</>;
};

export default HomeList;
