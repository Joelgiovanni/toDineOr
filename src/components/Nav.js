import React, { Component } from 'react';
import './styles/Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <nav className='navbar navbar-light bg-light'>
        <span className='nav-text'>
          <i className='fas fa-pizza-slice ml-4 mr-2'></i>
          To Dine Or Not?
        </span>
      </nav>
    );
  }
}
