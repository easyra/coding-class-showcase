import React, { Component } from 'react';
import { databaseRef } from '../firebase';

const SelectBar = ({
  activePeriod,
  changePeriod,
  changeProjectState,
  changeListLoadingState
}) => {
  const active = 'btn blue darken-3';
  const inactive = 'btn-flat blue-text text-darken-3';
  function handleClick(e, n) {
    //n = parseInt(e.target['name']);
    changePeriod(n);
    changeListLoadingState(true);
    const period = active;
    const periodString = period === 0 ? 'all' : `period${period}`;
    const project = 'project1';
    const rootPath = `kimsclass-${project}-${periodString}`;
    databaseRef.child(rootPath).on('value', snapshot => {
      const projects = snapshot.exists()
        ? Object.values(snapshot.val())
        : false;
      if (projects) {
        changeProjectState(projects);
      }
    });
    changeListLoadingState(false);
  }
  return (
    <>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper container'>
          <ul className='center'>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 0);
                }}
                name='0'
                className={activePeriod === 0 ? active : inactive}
              >
                All
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 1);
                }}
                name='1'
                className={activePeriod === 1 ? active : inactive}
              >
                Period 1
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 2);
                }}
                name='2'
                className={activePeriod === 2 ? active : inactive}
              >
                Period 2
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 3);
                }}
                name='3'
                className={activePeriod === 3 ? active : inactive}
              >
                Period 3
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 4);
                }}
                name='4'
                className={activePeriod === 4 ? active : inactive}
              >
                Period 4
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 5);
                }}
                name='5'
                className={activePeriod === 5 ? active : inactive}
              >
                Period 5
              </div>
            </li>
            <li>
              <div
                onClick={e => {
                  handleClick(e, 6);
                }}
                name='6'
                className={activePeriod === 6 ? active : inactive}
              >
                Period 6
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SelectBar;
