import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import JokeCardSkeleton from '../../Moleculs/JokeCard/JokeCardSkeleton';
import JokeCard from '../../Moleculs/JokeCard';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const url = 'https://official-joke-api.appspot.com/random_joke';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [joke, setJoke] = useState({});
  const { data, error } = useSWR(url, fetcher);
  const [changeJoke, setChangeJoke] = useState(true);

  if (error) {
    console.log(error);
  }
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
    }, 600);
    if (window.localStorage.getItem('saved_jokes') === null) {
      window.localStorage.setItem('saved_jokes', '[]');
    }
    let saved_jokes = JSON.parse(window.localStorage.getItem('saved_jokes'));
    saved_jokes.push({
      id: joke.id,
      setup: joke.setup,
      punchline: joke.punchline,
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
        <JokeCard id={joke.id} setup={joke.setup} punchline={joke.punchline} />
      ) : (
        <JokeCardSkeleton />
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
          <button className="button">
            <i className="bi bi-check-circle-fill"></i> Saved Joke(s)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
