import React from 'react';

import NavContent from './NavContent';

const Navigator = ({ toggleUploadModal, uploadModalOn }) => {
  return (
    <>
      <nav className='blue darken-3'>
        <div className='nav-wrapper container'>
          <a href='/' className='brand-logo '>
            Mr Kim's Class
          </a>
          <NavContent
            toggleUploadModal={toggleUploadModal}
            uploadModalOn={uploadModalOn}
          />
        </div>
      </nav>
    </>
  );
};

export default Navigator;
