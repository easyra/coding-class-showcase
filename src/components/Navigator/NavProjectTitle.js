import React from 'react';

const NavProjectTitle = ({ title, id, changeProjectsDisplayed }) => {
  const handleClick = () => {
    changeProjectsDisplayed('default', id, false);
  };
  return (
    <li>
      <a onClick={handleClick}>{title}</a>
    </li>
  );
};

export default NavProjectTitle;
