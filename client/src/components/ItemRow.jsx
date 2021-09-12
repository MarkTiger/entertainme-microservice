import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const DELETE_MOVIE = gql`
  mutation DeleteMovie($deleteMovieId: ID!) {
    deleteMovie(id: $deleteMovieId)
  }
`;

export default function ItemRow({ itemData }) {
  const [deleteMovie, { data, loading, error }] = useMutation(DELETE_MOVIE, {
    errorPolicy: 'all',
    refetchQueries: ['GetMovies'],
  });

  const handleDelete = (id) => () => {
    deleteMovie({ variables: { deleteMovieId: id } });
  };

  if (data) {
    console.log(data);
  }

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
        <td>{itemData.poster_path}</td>
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
