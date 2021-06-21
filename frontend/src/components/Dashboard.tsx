import * as React from 'react';
import {useContext} from 'react';
import {IMovie} from '../interface';
import DashboardContext from '../contexts/DashboardContext';

export const Dashboard = () => {
  const {movies, loadNext} = useContext(DashboardContext);

  return (
    <div>
      <div className="products">
        <ul>
          {movies.map((product: IMovie) => (
            <li key={product._id}>{product.title}</li>
          ))}
          <button onClick={loadNext}>load next</button>
        </ul>
      </div>
    </div>
  );
};
