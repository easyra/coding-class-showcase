import React, { Component } from 'react';
import { withRouter } from 'react-router';

class HomeCard extends Component {
  handleClick = () => {
    const { link } = this.props;
    window.location.href = `#/${link}`;
  };
  render() {
    const {
      title,
      period,
      img,
      link,
      projectTitle,
      activePeriod,
      history
    } = this.props;

    return (
      <div className='col s12 m3 hoverable'>
        <a target='_blank' href={link} className='black-text'>
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
        </a>
      </div>
    );
  }
}

export default HomeCard;
