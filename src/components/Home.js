import React, { Component } from 'react';
import './styles/Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className='container-fluid home-container'>
        <div className='row'>
          <div className='col mt-5 '>
            <h2 className='ml-5 main-header'>
              Tired of constantly looking for somewhere new to eat?
            </h2>
            <p className='main-supporting ml-5 mt-5'>
              Dont randomly pick a restaurant in hopes that you will love it!
              Let us do it for you! Based on your location we will randomly pick
              a restaurant near you! We will aslo include important details you
              may need!
            </p>
          </div>
          <div className='col right text-center'>
            <ul id='icon-list'>
              <li>
                <i className='fas fa-search-location my-icon '></i>
              </li>
              <li>
                <i className='fas fa-arrow-right arrow'></i>{' '}
              </li>
              <li>
                <i className='fas fa-hamburger my-icon'></i>{' '}
              </li>
              <li>
                <i className='fas fa-arrow-right arrow'></i>{' '}
              </li>
              <li>
                <i className='far fa-laugh-beam my-icon'></i>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
