import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from './components/AddReview';
import RestaurantsList from './components/RestaurantsList';
import Restaurant from './components/Restaurant';
import Login from './components/Login';

const App = (props) => {
  const [user, setUser] = useState(null);

  const login = async (user = null) => {
    setUser(user);
  };

  const logout = async (user = null) => {
    setUser(null);
  };

  return (
    <div>
      {/* START NAVBAR */}
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/restaurants' className='navbar-brand'>
          Restaurant Reviews
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/restaurants' className='nav-link'>
              Restaurants
            </Link>
          </li>
          <li className='nav-item'>
            {user ? ( // check if the user is already login
              <a
                onClick={logout}
                className='nav-link'
                style={{ cursor: 'pointer' }}
                href='/'
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      {/* FINISH NAVBAR */} 

      <div className='container mt-3'>
        <Routes>
          <Route
            exact
            path='/restaurants'
            element={<RestaurantsList />}
          />
          <Route
            path='/restaurants/:id/review'
            element={<AddReview {...props} user={user} />}
          />
          <Route
            path='/restaurants/id/:id'
            element={<Restaurant {...props} user={user} />}
          />
          <Route
            path='/login'
            element={<Login login={login} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
