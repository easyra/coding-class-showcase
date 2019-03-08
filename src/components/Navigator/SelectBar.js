import React, { Component } from 'react';

const SelectBar = ({ activePeriod, changePeriod }) => {
  const active = 'btn blue darken-3';
  const inactive = 'btn-flat blue-text text-darken-3';
  function handleClick(e) {
    const n = parseInt(e.target['name']);
    console.log(e.target['name']);
    changePeriod(n);
  }
  return (
    <>
      <nav className='transparent z-depth-0'>
        <div className='nav-wrapper container'>
          <ul className='center'>
            <li>
              <div
                onClick={() => {
                  changePeriod(0);
                }}
                name='0'
                className={activePeriod === 0 ? active : inactive}
              >
                All
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(1);
                }}
                name='1'
                className={activePeriod === 1 ? active : inactive}
              >
                Period 1
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(2);
                }}
                name='2'
                className={activePeriod === 2 ? active : inactive}
              >
                Period 2
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(3);
                }}
                name='3'
                className={activePeriod === 3 ? active : inactive}
              >
                Period 3
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(4);
                }}
                name='4'
                className={activePeriod === 4 ? active : inactive}
              >
                Period 4
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(5);
                }}
                name='5'
                className={activePeriod === 5 ? active : inactive}
              >
                Period 5
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  changePeriod(6);
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
