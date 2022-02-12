import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastOptions } from '../helpers/toastOptions';

const DELETE_MOVIE = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId)
  }
`;

export default function ItemRow({ itemData }) {
  const [deleteMovie, { loading, error }] = useMutation(DELETE_MOVIE, {
    errorPolicy: 'all',
    refetchQueries: ['GetMovies'],
    onError: (err) => {
      console.log(err);
      if (err.message.includes('404')) {
        toast.error(`Movie with id ${itemData._id} is not found`, toastOptions);
      } else {
        toast.error(`Internal server error`, toastOptions);
      }
    },
    onCompleted: () => {
      toast.success('Movie deleted', toastOptions);
    },
  });

  const handleDelete = (id) => () => {
    deleteMovie({
      variables: { deleteMovieId: id },
    });
  };

  if (loading) {
    return (
      <tr>
        <td colSpan="6">Deleting...</td>
      </tr>
    );
  } else if (error) {
    return (
      <tr>
        <td colSpan="6">Something went wrong...</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{itemData.title}</td>
        <td>{itemData.overview}</td>
        <td>
          <img src={itemData.poster_path} width="100" alt="poster" />
        </td>
        <td>{itemData.popularity}</td>
        <td>
          {itemData.tags.map((tag, i) => {
            return (
              <span
                className="badge bg-light text-dark me-2"
                key={itemData._id + 'tagManage' + i}
              >
                {tag}
              </span>
            );
          })}
        </td>
        <td>
          <Link
            to={`/manage-movies/edit/${itemData._id}`}
            className="btn btn-light m-1"
          >
            <i className="bi bi-pencil"></i>
          </Link>
          <button
            onClick={handleDelete(itemData._id)}
            className="btn btn-light m-1"
          >
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    );
  }
}
