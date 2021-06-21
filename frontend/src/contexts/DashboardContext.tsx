import * as React from 'react';
import {useEffect, useState} from 'react';
import {IDashboardContextState, IMovie} from '../interface';
import {fetchMovies} from '../api/movies';

const defaultValue: IDashboardContextState = {
  movies: [],
  loadNext: () => void {},
};

export const DashboardContext = React.createContext(defaultValue);

export const DashboardContextProvider: React.FC = ({children}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const loadNext = () => {
    const [lastMovie] = movies.slice(-1);

    fetchMovies(lastMovie.name).then(nextMovies =>
      setMovies([...movies, ...nextMovies])
    );
  };

  const providerValue: IDashboardContextState = {
    movies,
    loadNext,
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
