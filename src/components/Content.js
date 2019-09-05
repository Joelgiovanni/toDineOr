import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import './styles/Content.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const keys = require('../config/Keys');

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      loaded: false
    };
  }
  onClick = () => {
    this.getLocation();
  };
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loaded: true
        });
        // Only call Zomato API if coordinates have been received
        if (this.state.loaded === true) {
          this.getRestaurants(this.state.latitude, this.state.longitude);
        }
      },
      error =>
        this.setState({
          error: error.message
        }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  getRestaurants = (lat, lng) => {
    const userKey = keys.userKey;

    const currentLocation =
      'https://developers.zomato.com/api/v2.1/geocode?lat=' +
      lat +
      '&lon=' +
      lng;

    //Call to find nearby restaurants with users coordinates
    axios({
      method: 'get',
      url: currentLocation,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'user-key': userKey
      }
    })
      .then(res => {
        // Uncomment line below if you want to see the originial response from API call
        //console.log(res);

        // Save restaurants from API call
        const restaurantsNearUser = res.data.nearby_restaurants;
        this.setState({
          restaurants: restaurantsNearUser
        });

        // Pick out a random retaurant from what the API returns
        var randomRestaurant =
          restaurantsNearUser[
            Math.floor(Math.random() * restaurantsNearUser.length)
          ];
        // Select only the data that I want
        var finalResult = {
          name: randomRestaurant.restaurant.name,
          id: randomRestaurant.restaurant.id,
          address: randomRestaurant.restaurant.location.address,
          delivery: randomRestaurant.restaurant.is_delivering_now,
          menu: randomRestaurant.restaurant.menu_url,
          typeOfFood: randomRestaurant.restaurant.cuisines
        };
        this.setState({
          selectedRestaurant: finalResult
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='container-fluid content-container text-center'>
        <h2 className='content-header mt-5'>What are you waiting for?</h2>
        <h4 className='content-supporting mt-3 mb-4'>Give it a shot..</h4>
        <button
          onClick={this.onClick}
          className='search-button mt-3'
          data-toggle='modal'
          data-target='#exampleModalCenter'
        >
          Find Food <i className='fas fa-map-marker-alt marker-button ml-2'></i>
        </button>
        <div className='mt-4'>
          <div
            className='modal fade'
            id='exampleModalCenter'
            tabIndex='-1'
            role='dialog'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title '>
                    {this.state.selectedRestaurant ? (
                      this.state.selectedRestaurant.name
                    ) : (
                      <Loader
                        type='ThreeDots'
                        color='#00BFFF'
                        height={50}
                        width={50}
                      />
                    )}{' '}
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span className='text-danger' aria-hidden='true'>
                      &times;
                    </span>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='container'>
                    <div className='row mb-2'>
                      <div className='col text-center'>
                        <div className='p modal-text'>
                          {this.state.selectedRestaurant ? (
                            this.state.selectedRestaurant.typeOfFood
                          ) : (
                            <Loader
                              type='ThreeDots'
                              color='#00BFFF'
                              height={50}
                              width={50}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col text-center'>
                        <div className='p modal-text'>
                          {this.state.selectedRestaurant ? (
                            this.state.selectedRestaurant.address
                          ) : (
                            <Loader
                              type='ThreeDots'
                              color='#00BFFF'
                              height={50}
                              width={50}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col text-center mt-2'>
                        <div className='p modal-text'>
                          {this.state.selectedRestaurant ? (
                            <a
                              className='menu-link '
                              target='_blank'
                              rel='noopener noreferrer'
                              href={this.state.selectedRestaurant.menu}
                            >
                              See Menu
                            </a>
                          ) : (
                            <Loader
                              type='ThreeDots'
                              color='#00BFFF'
                              height={50}
                              width={50}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row text-center'>
                  <div className='col'>
                    <button
                      type='button'
                      className='btn search-again-button mb-4'
                      onClick={this.onClick}
                    >
                      Search Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
