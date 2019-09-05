import React, { Component } from 'react';
import './styles/Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className='row footer'>
          <div className='col text-center'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://github.com/Joelgiovanni'
              className='fab fa-github git-icon mt-3 mb-2'
            >
              {' '}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
