import React from 'react';

const NavProjectTitle = ({ title, id, changeProjectsDisplayed }) => {
  const handleClick = () => {
    changeProjectsDisplayed('default', id, false);
  };
  return (
    <li>
      <a onClick={handleClick} className='blue-text'>
        {title}
      </a>
    </li>
  );
};

export default NavProjectTitle;
