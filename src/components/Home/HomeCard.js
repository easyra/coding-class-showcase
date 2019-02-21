import React, {Component} from 'react';

class HomeCard extends Component{
  render(){
    const {title, period, img, link } = props
    return(
    <div>
      <h2>{title}</h2>
      <h4>{period}</h4>
      <img src={img} onClick={link}/>
    </div>)
  }
}

export default HomeCard