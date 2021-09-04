import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container">
      <h2 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>
        <i className="bi bi-emoji-dizzy-fill" style={{ fontSize: '42px' }}></i>{' '}
        <br /> Oops! Page Not Found!
      </h2>
      <Link to="/">
        <button className="button">Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
