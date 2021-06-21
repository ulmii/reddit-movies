import {IMovie} from '../interface';

export const fetchMovies = async (after = null): Promise<IMovie[]> => {
  return await fetch(
    `http://localhost:5000/api/movies${after !== null ? '?after=' + after : ''}`
  ).then(response => response.json());
};

export default fetchMovies;
