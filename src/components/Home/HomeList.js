import React from 'react';
import HomeCard from './HomeCard';
import LoadingNode from './LoadingNode';

const HomeList = ({ projects, listLoading, activePeriod }) => {
  function createRows(listLoading) {
    if (listLoading) {
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
              projectTitle={projects[j].projectTitle}
              activePeriod={activePeriod}
            />
          );
        }
      }
      parent.push(<div className='row container '>{children}</div>);
    }
    return parent;
  }
  return <>{createRows(listLoading)}</>;
};

export default HomeList;
