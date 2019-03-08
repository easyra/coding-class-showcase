import React from 'react';
import M from 'materialize-css';

const openModal = () => {
  const model = document.querySelector('#modal1');
  const instance = M.Modal.getInstance(model);
  instance.isOpen ? instance.close() : instance.open();
};

const Navigator = props => {
  return (
    <>
      <nav className='blue darken-3'>
        <div className='nav-wrapper container'>
          <a href='/' className='brand-logo '>
            Mr Kim's Class
          </a>
          <ul className='right '>
            <li>
              <a href='#modal1' onClick={openModal}>
                <i className='left material-icons'>file_upload</i>Upload
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigator;
