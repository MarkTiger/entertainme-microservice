import React from 'react';
import { useQuery } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import Item from '../components/Item';
import { toastOptions } from '../helpers/toastOptions';
import { GET_FAVORITE_MOVIES } from '../helpers/queries';

export default function FavoriteMovies() {
  const { data, loading, error } = useQuery(GET_FAVORITE_MOVIES, {
    onError(err) {
      toast.error('Something went wrong', toastOptions);
    },
    onCompleted(data) {
      if (data.favoriteMovies.length) {
        toast.success('Load favorite movies complete', toastOptions);
      } else {
        toast.info('Favorite movie list is empty', toastOptions);
      }
    },
  });

  if (loading) {
    return (
      <div className="bg-secondary text-light text-center h3 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );
  } else if (error) {
    <div className="bg-secondary text-light text-center h3 d-flex align-items-center justify-content-center">
      <ToastContainer />
      Something went wrong...
    </div>;
  } else {
    return (
      <div className="p-3 bg-secondary">
        <ToastContainer />
        <div className="row p-3">
          <div className="col-12 text-center h2 p-3 bg-dark text-light rounded m-0">
            Favorite Movies
          </div>
        </div>
        <div className="row">
          {data.favoriteMovies.map((movie) => (
            <Item key={movie._id} itemData={movie} />
          ))}
        </div>
      </div>
    );
  }
}
