import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Item from '../components/Item';

const GET_ALL = gql`
  query GetAll {
    all {
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
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL);

  if (loading) {
    return (
      <div className="col-12 bg-secondary text-light text-center h3 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );
  } else if (error) {
    <div className="col-12 bg-secondary text-light text-center h3 d-flex align-items-center justify-content-center">
      Something went wrong...
    </div>;
  } else {
    return (
      <div className="col-12 bg-secondary">
        <div className="row p-3">
          <div className="col-12 text-center h2 p-3 bg-dark text-light rounded">
            Movies
          </div>
        </div>
        <div className="row">
          {data.all.movies.map((movie) => (
            <Item key={movie._id} itemData={movie} />
          ))}
        </div>
        <div className="row p-3">
          <div className="col-12 text-center h2 p-3 bg-dark text-light rounded">
            TV Series
          </div>
        </div>
        <div className="row">
          {data.all.tvSeries.map((oneTvSeries) => (
            <Item key={oneTvSeries._id} itemData={oneTvSeries} />
          ))}
        </div>
      </div>
    );
  }
}
