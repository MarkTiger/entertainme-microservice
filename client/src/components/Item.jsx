import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GET_FAVORITE_MOVIES } from '../helpers/queries';
import { favoriteMoviesVar } from '../helpers/reactiveVar';

export default function Item({ itemData, isTv }) {
  const location = useLocation();

  const [isFavorite, setIsFavorite] = useState(false);

  const { data } = useQuery(GET_FAVORITE_MOVIES, {
    onCompleted(data) {
      const find = data.favoriteMovies.find(
        (favorite) => favorite._id === itemData._id
      );
      if (find) {
        setIsFavorite(true);
      }
    },
  });

  const handleFavorite = () => {
    if (isFavorite) {
      const newFavoriteMovies = data.favoriteMovies.filter(
        (favorite) => favorite._id !== itemData._id
      );
      favoriteMoviesVar(newFavoriteMovies);
      setIsFavorite(false);
    } else {
      const newFavoriteMovies = [...favoriteMoviesVar(), itemData];
      favoriteMoviesVar(newFavoriteMovies);
      setIsFavorite(true);
    }
  };

  return (
    <div className="col-lg-6 col-sm-12 text-center p-3">
      <div className="bg-dark text-light rounded d-flex flex-row shadow h-100">
        <img src={itemData.poster_path} className="rounded w-25" alt="poster" />
        <div className="d-flex flex-column align-items-start p-2 w-75">
          <h4>{itemData.title}</h4>
          <p style={{ textAlign: 'justify' }}>{itemData.overview}</p>
          <span>
            <strong>Popularity :</strong> {itemData.popularity}
          </span>
          <div className="d-flex mt-2">
            <span className="fw-bold">Tags :</span>
            <span>
              {itemData.tags.map((tag, i) => {
                return (
                  <span
                    className="badge bg-light text-dark mx-2"
                    key={itemData._id + 'tag' + i}
                  >
                    {tag}
                  </span>
                );
              })}
            </span>
          </div>
          {location.pathname === '/' && !isTv ? (
            <div className="w-100 d-flex justify-content-end align-items-end mt-3 flex-grow-1">
              <button onClick={handleFavorite} className="btn link-light">
                <i
                  className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}
                ></i>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
