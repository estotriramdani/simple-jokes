import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JokeCard from '../../Moleculs/JokeCard';
import JokeCardSkeleton from '../../Moleculs/JokeCard/JokeCardSkeleton';
import Gap from '../../Atoms/Gap';
import './savedJokes.css';

const SavedJokes = () => {
  const [savedJokes, setSavedJokes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const arrs = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleDelete = (index) => {
    const itemIndex = savedJokes.findIndex((x) => x.id === index);
    let newJokes = [];
    for (let i = 0; i < savedJokes.length; i++) {
      if (i === itemIndex) {
        continue;
      }
      newJokes.push(savedJokes[i]);
    }
    window.localStorage.setItem('saved_jokes', JSON.stringify(newJokes));
    setSavedJokes(newJokes);
  };

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
          arrs.map((arr) => {
            return (
              <div className="joke-item" key={arr}>
                <JokeCardSkeleton />
              </div>
            );
          })
        ) : savedJokes.length <= 0 ? (
          <div className="joke-item">
            <JokeCard setup="Oops!" punchline="No jokes here" id="0" />
          </div>
        ) : (
          savedJokes.map((joke) => {
            return (
              <div className="joke-item" key={joke.id}>
                <JokeCard
                  id={joke.id}
                  punchline={joke.punchline}
                  setup={joke.setup}
                />
                <Gap height={10} />
                <div className="button-group">
                  <button
                    className="button-danger"
                    onClick={() => handleDelete(joke.id)}
                  >
                    <i className="bi bi-emoji-dizzy-fill"></i> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Link to="/">
        <button className="button">Back To Home</button>
      </Link>
    </div>
  );
};

export default SavedJokes;
