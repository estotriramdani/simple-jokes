import React from 'react';
import Skeleton from 'react-loading-skeleton';

const JokeCardSkeleton = () => {
  return (
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
  );
};

export default JokeCardSkeleton;
