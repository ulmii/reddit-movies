import * as React from 'react';
import {useEffect, useState} from 'react';
import {IDashboardContextState, IMovie} from '../interface';
import {fetchMovies} from '../api/movies';

const defaultValue: IDashboardContextState = {
  movies: [],
};

export const DashboardContext = React.createContext(defaultValue);

export const DashboardContextProvider: React.FC = ({children}) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const providerValue: IDashboardContextState = {
    movies,
  };

  useEffect(() => {
    fetchMovies().then(movies => {
      console.log(movies);
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
