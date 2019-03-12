import React, { Component } from 'react';
import HomeCard from './HomeCard';
import LoadingNode from './LoadingNode';

const HomeList = props => {
  const { projects } = props;
  function createRows() {
    if (projects.length < 1) {
      console.log('object');
      return <LoadingNode />;
    }

    let parent = [];
    for (let i = projects.length / 4; i > 0; i--) {
      let children = [];
      let startIndex = i * 4 - 1;
      for (let j = startIndex; j > startIndex - 4; j--) {
        if (projects[j]) {
          children.push(
            <HomeCard
              title={projects[j].title}
              img={projects[j].img}
              link={projects[j].link}
              period={projects[j].period}
            />
          );
        }
      }
      parent.push(<div className='row container '>{children}</div>);
    }
    console.log(parent);
    return parent;
  }
  return <>{createRows()}</>;
};

export default HomeList;
