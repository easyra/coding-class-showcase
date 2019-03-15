import React, { Component } from 'react';
import { databaseRef } from '../firebase';

const SelectBar = ({
  activePeriod,
  changeProjectsDisplayed,
  projectTitle,
  listLoading
}) => {
  const active = 'btn blue darken-3';
  const inactive = 'btn-flat blue-text text-darken-3';
  function handleClick(e) {
    changeProjectsDisplayed(parseInt(e.target.name), 'default', true);
  }
  return (
    <>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper container'>
          <ul className='center'>
            <li>
              <input
                type='button'
                value='All'
                onClick={handleClick}
                name='0'
                className={activePeriod === 0 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 1'
                onClick={handleClick}
                name='1'
                className={activePeriod === 1 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 2'
                onClick={handleClick}
                name='2'
                className={activePeriod === 2 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 3'
                onClick={handleClick}
                name='3'
                className={activePeriod === 3 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 4'
                onClick={handleClick}
                name='4'
                className={activePeriod === 4 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 5'
                onClick={handleClick}
                name='5'
                className={activePeriod === 5 ? active : inactive}
              />
            </li>
            <li>
              <input
                type='button'
                value='Period 6'
                onClick={handleClick}
                name='6'
                className={activePeriod === 6 ? active : inactive}
              />
            </li>
          </ul>

          {projectTitle && (
            <ul>
              <li className='right'>
                <a className={active}>{projectTitle}</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default SelectBar;
