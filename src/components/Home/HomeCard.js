import React, { Component } from 'react';

class HomeCard extends Component {
  render() {
    const { title, period, img, link } = this.props;
    return (
      <div className='col s12 m3'>
        <div className='card'>
          <div className='card-image'>
            <img src={img} />
            <span className='card-title'>
              {title} Per.{period}
            </span>
          </div>
          <div className='card-content'>
            <p>lorem15</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCard;
