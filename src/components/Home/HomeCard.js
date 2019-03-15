import React, { Component } from 'react';

class HomeCard extends Component {
  render() {
    const { title, period, img, link, projectTitle, activePeriod } = this.props;
    return (
      <div className='col s12 m3 hoverable'>
        <div className='card'>
          <div className='card-image'>
            <img className='responsive-img' src={img} />
            <span className='card-title'>{projectTitle}</span>
          </div>
          <div className='card-content'>
            <p>{title}</p>
            {activePeriod === 0 && <p>Period {period}</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCard;
