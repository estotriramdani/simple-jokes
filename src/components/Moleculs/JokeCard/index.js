import React from 'react';
import Skeleton from 'react-loading-skeleton';

const JokeCard = ({ id, setup, punchline }) => {
  return (
    <div>
      <div className="joke-card">
        <p className="joke-id">
          Joke ID: {id || <Skeleton width="40px" count={1} />}
        </p>
        <div className="joke-setup">
          {setup || <Skeleton width="100%" count={2} />}
        </div>
        <div className="joke-punchline">
          {punchline || <Skeleton width="90%" count={2} />}
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
