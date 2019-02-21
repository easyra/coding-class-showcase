import React, { Component } from 'react';
import HomeList from './HomeList';
import Navigator from '../Navigator/Navigator';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        {
          title: 'Hello',
          link: 'Link',
          img: 'https://i.redd.it/mwedwxbserb21.jpg',
          period: 2
        },
        {
          title: 'Hello',
          link: 'Link',
          img: 'https://i.redd.it/mwedwxbserb21.jpg',
          period: 2
        },
        {
          title: 'Hello',
          link: 'Link',
          img: 'https://i.redd.it/mwedwxbserb21.jpg',
          period: 2
        }
      ]
    };
  }
  render() {
    const { projects } = this.state;
    return (
      <div>
        <Navigator />
        <HomeList projects={projects} />
      </div>
    );
  }
}

export default HomeContainer;
