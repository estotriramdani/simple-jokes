import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import './savedJokes.css';

const SavedJokes = () => {
  const [savedJokes, setSavedJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      if (localStorage.getItem('saved_jokes') !== null) {
        let saved_jokes = JSON.parse(localStorage.getItem('saved_jokes'));
        setSavedJokes(saved_jokes);
      }
      setIsLoading(false);
    }
    return () => {
      setIsLoading(false);
    };
  }, [isLoading]);

  return (
    <div className="container saved-jokes-page">
      <h2 style={{ color: 'white', marginBottom: '10px' }}>
        <i className="bi bi-emoji-sunglasses-fill"></i> Your Saved Jokes
      </h2>
      <div className="joke-list">
        {isLoading ? (
          <div className="joke-item">
            <div className="joke-card">
              <p className="joke-id">
                <Skeleton width="50%" />
              </p>
              <div className="joke-setup">
                <Skeleton width="100%" count={2} />
              </div>
              <div className="joke-punchline">
                <Skeleton width="90%" count={1} />
              </div>
            </div>
          </div>
        ) : savedJokes.length <= 0 ? (
          'No Jokes!'
        ) : (
          savedJokes.map((joke) => {
            let i = 1;
            return (
              <div className="joke-item" key={joke.id + i++}>
                <div className="joke-card" style={{ marginBottom: '10px' }}>
                  <p className="joke-id">{joke.id}</p>
                  <div className="joke-setup">{joke.setup}</div>
                  <div className="joke-punchline">{joke.punchline}</div>
                </div>
                <div className="button-group">
                  <button className="button-danger">
                    <i className="bi bi-emoji-dizzy-fill"></i> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Link to="/" style={{ width: '100%', marginTop: '10px' }}>
        <button className="button">Back To Home</button>
      </Link>
    </div>
  );
};

export default SavedJokes;
