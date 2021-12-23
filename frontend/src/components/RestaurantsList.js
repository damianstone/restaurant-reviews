import React, { useState, useEffect } from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link } from 'react-router-dom';

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchZip, setSearchZip] = useState('');
  const [searchCuisine, setSearchCuisine] = useState('');
  const [cuisines, setCuisines] = useState(['All Cuisines']);

  useEffect(() => {
    // after rendering
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  // ONCHENGE VALUES
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  // RETRIEVE RESTAURANTS
  const retrieveRestaurants = () => {
    RestaurantDataService.getAll() // make a call
      .then((response) => {
        // get the all the restaurants
        console.log(response.data);
        setRestaurants(response.data.restaurants); // set the restaurant to the current state array
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // RETRIEVE CUISINES
  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines() // get call
      .then((response) => {
        // get the cuisines
        console.log(response.data);
        setCuisines(['All Cuisines'].concat(response.data)); // set the cuisines to the current state
      }) // all the cuisines if the user dont wanna filter by cuisine
      .catch((e) => {
        console.log(e);
      });
  };

  // REFRESH RESTAURANTS
  const refreshList = () => {
    retrieveRestaurants(); // refresh all the restaurants if the user select a cuisine
  };

  // FIND GENERAL
  const find = (query, by) => {
    // if someone try to find something this function will be called
    RestaurantDataService.find(query, by)
      .then((response) => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // FIND BY NAME
  const findByName = () => {
    find(searchName, 'name');
  };

  // FIND BY ZIP
  const findByZip = () => {
    find(searchZip, 'zipcode');
  };

  // FIND BY CUISINE
  const findByCuisine = () => {
    if (searchCuisine === 'All Cuisines') {
      refreshList();
    } else {
      find(searchCuisine, 'cuisine');
    }
  };

  return (
    <div>
      <div className='row pb-1'>
        <div className='input-group col-lg'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by zip'
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg'>
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine) => {
              // list to select the cosines
              return <option value={cuisine}> {cuisine.substring(0, 20)} </option>;
            })}
          </select>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='row'>
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className='col-lg-4 pb-1'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{restaurant.name}</h5>
                  <p className='card-text'>
                    <strong>Cuisine: </strong>
                    {restaurant.cuisine}
                    <br />
                    <strong>Address: </strong>
                    {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={'/restaurants/id/'+restaurant._id}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View Reviews
                    </Link>
                    <a
                      target='_blank'
                      href={'https://www.google.com/maps/place/' + address}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                      rel='noreferrer'
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
