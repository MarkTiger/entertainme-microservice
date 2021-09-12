import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIE = gql`
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
      title
      overview
      popularity
      poster_path
      tags
      _id
    }
  }
`;

export default function IsEdit({ setMovie, id }) {
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  useEffect(() => {
    if (!loading && !error && data) {
      setMovie(data.movie);
    }
  }, [loading, error, data, setMovie]);

  if (error) {
    return (
      <div className="bg-dark text-light p-3 h4 rounded">Invalid Movie ID</div>
    );
  } else {
    return <div></div>;
  }
}
