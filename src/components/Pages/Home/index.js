import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const url = 'https://official-joke-api.appspot.com/random_joke';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [joke, setJoke] = useState({});
  const { data, error } = useSWR(url, fetcher);
  const [changeJoke, setChangeJoke] = useState(true);

  useEffect(() => {
    if (data && isLoading) {
      setJoke(data);
      setChangeJoke(true);
    }
    return () => {
      setIsLoading(false);
    };
  }, [data, isLoading, joke]);

  const handleSaveJoke = () => {
    document.querySelector('.alert').classList.add('up');
    setTimeout(() => {
      document.querySelector('.alert').classList.remove('up');
    }, 3000);
    if (window.localStorage.getItem('saved_jokes') === null) {
      window.localStorage.setItem('saved_jokes', '[]');
    }
    let saved_jokes = JSON.parse(window.localStorage.getItem('saved_jokes'));
    saved_jokes.push({
      id: joke.id,
      setup: joke.setup,
      punhcline: joke.punhcline,
    });
    window.localStorage.setItem('saved_jokes', JSON.stringify(saved_jokes));
  };

  const handleChangeJoke = () => {
    setChangeJoke(false);
    axios
      .get(url)
      .then((response) => {
        setJoke(response.data);
        setChangeJoke(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="alert" style={{ color: '#f72585' }}>
        <i className="bi bi-emoji-laughing-fill alert-icon"></i>
        <span className="alert-text">Joke saved!</span>
      </div>
      {changeJoke ? (
        <div className="joke-card">
          <p className="joke-id">
            Joke ID: {joke.id || <Skeleton width="40px" count={1} />}
          </p>
          <div className="joke-setup">
            {joke.setup || <Skeleton width="100%" count={2} />}
          </div>
          <div className="joke-punchline">
            {joke.punchline || <Skeleton width="90%" count={2} />}
          </div>
        </div>
      ) : (
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
      )}
      {isLoading ? (
        <div className="button-group">
          <button className="button">
            <Skeleton width="100%" count={1} />
          </button>
          <button className="button" onClick={handleChangeJoke}>
            <Skeleton width="100%" count={1} />
          </button>
        </div>
      ) : (
        <div className="button-group">
          <button
            className="button"
            onClick={handleSaveJoke}
            disabled={isLoading ? true : false}
          >
            <i className="bi bi-emoji-laughing-fill"></i> Save Joke
          </button>
          <button className="button" onClick={handleChangeJoke}>
            <i className="bi bi-emoji-heart-eyes"></i> Another One
          </button>
        </div>
      )}

      <div className="button-group">
        <Link to="/saved-jokes" style={{ width: '100%' }}>
          <button className="button" onClick={handleChangeJoke}>
            <i className="bi bi-check-circle-fill"></i> Saved Joke(s)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
