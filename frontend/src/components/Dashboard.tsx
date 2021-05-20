import React, {useContext} from 'react';
import {IMovie} from '../interface';
import DashboardContext from '../contexts/DashboardContext';

export const Dashboard = () => {
  const {movies} = useContext(DashboardContext);

  return (
    <div>
      <div className="products">
        <ul>
          {movies.map((product: IMovie) => (
            <li>{product.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
