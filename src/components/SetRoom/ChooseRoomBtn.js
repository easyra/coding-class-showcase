import React, { Component } from 'react';

const ChooseRoomBtn = ({ title, changeRoom }) => {
  const handleClick = () => {
    //Checks if the title is Join Room
    //Join room is 1. Create room is 2
    const n = title[0] === 'J' ? 1 : 2;
    changeRoom(n);
  };
  return (
    <a
      onClick={handleClick}
      class='roombtn waves-effect waves-light btn blue darken-3'
    >
      {title}
    </a>
  );
};

export default ChooseRoomBtn;
