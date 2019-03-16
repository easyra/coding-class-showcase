import React from 'react';
import { withRouter } from 'react-router';
import NavContent from './NavContent';

const Navigator = ({
  toggleUploadModal,
  uploadModalOn,
  changeProjectsDisplayed,
  match
}) => {
  return (
    <>
      <nav className='blue darken-3'>
        <div className='nav-wrapper container'>
          <a href='/' className='brand-logo '>
            {match.params.className}
          </a>
          <NavContent
            changeProjectsDisplayed={changeProjectsDisplayed}
            toggleUploadModal={toggleUploadModal}
            uploadModalOn={uploadModalOn}
          />
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navigator);
