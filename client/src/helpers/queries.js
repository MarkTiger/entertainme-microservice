import { gql } from '@apollo/client';

export const GET_ALL = gql`
  query GetAll {
    movies {
      title
      overview
      poster_path
      popularity
      tags
      _id
    }
    tvSeries {
      title
      overview
      poster_path
      popularity
      tags
      _id
    }
  }
`;

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation CreateMovie($createMoviePayload: MovieInput) {
    createMovie(payload: $createMoviePayload)
  }
`;

export const EDIT_MOVIE = gql`
  mutation UpdateMovie($updateMovieId: ID!, $updateMoviePayload: MovieInput) {
    updateMovie(id: $updateMovieId, payload: $updateMoviePayload)
  }
`;

export const GET_FAVORITE_MOVIES = gql`
  query {
    favoriteMovies @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
