import {IMovie} from '../interface';

export const fetchMovies = async (): Promise<IMovie[]> => {
  return await fetch('http://localhost:5000/api/movies').then(response =>
    response.json()
  );
};

export default fetchMovies;
