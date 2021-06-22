import * as React from 'react';
import {useEffect, useState} from 'react';
import {IDashboardContextState, IMovie} from '../interface';
import {fetchMovies} from '../api/movies';
import _ from 'lodash';

const defaultValue: IDashboardContextState = {
  movies: [],
  throttledLoad: () => void {},
};

export const DashboardContext = React.createContext(defaultValue);

export const DashboardContextProvider: React.FC = ({children}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [lastMovieIds, setLastMovieIds] = useState<string[]>([]);
  const throttledLoad = _.throttle(() => {
    loadNext();
  }, 500);

  const loadNext = () => {
    const [lastMovie] = movies.slice(-1);

    if (lastMovie && !lastMovieIds.includes(lastMovie._id)) {
      setLastMovieIds([...lastMovieIds, lastMovie._id]);

      fetchMovies(lastMovie.name).then(nextMovies =>
        setMovies([...movies, ...nextMovies])
      );
    }
  };

  const providerValue: IDashboardContextState = {
    movies,
    throttledLoad,
  };

  useEffect(() => {
    fetchMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <DashboardContext.Provider value={providerValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
