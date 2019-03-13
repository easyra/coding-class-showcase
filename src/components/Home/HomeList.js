import React, { Component } from 'react';
import HomeCard from './HomeCard';
import LoadingNode from './LoadingNode';

const HomeList = ({ projects, listLoading }) => {
  function createRows(listLoading) {
    if (listLoading) {
      console.log('object');
      return <LoadingNode />;
    }
    if (projects.length < 1) {
      return <h1 className='gray-text center'>No Projects :)</h1>;
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
  return <>{createRows(listLoading)}</>;
};

export default HomeList;
