import React, { Component } from 'react';

class HomeCard extends Component {
  render() {
    const { title, period, img, link, projectTitle } = this.props;
    return (
      <div className='col s12 m3 hoverable'>
        <div className='card'>
          <div className='card-image'>
            <img className='responsive-img' src={img} />
            <span className='card-title'>{projectTitle}</span>
          </div>
          <div className='card-content'>
            <p>{`By ${title}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCard;
