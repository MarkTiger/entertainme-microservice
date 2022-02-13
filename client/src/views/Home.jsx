import React from 'react';
import { useQuery } from '@apollo/client';
import Item from '../components/Item';
import { toast } from 'react-toastify';
import { GET_ALL } from '../helpers/queries';

export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL, {
    onError(err) {
      toast.error('Internal Server Error', {
        theme: 'dark',
        position: 'bottom-right',
      });
    },
    onCompleted() {
      toast.success('Fetch complete!', {
        theme: 'dark',
        position: 'bottom-right',
      });
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
      
      Something went wrong...
    </div>;
  } else {
    return (
      <div className="p-3 bg-secondary">
        
        <div className="row p-3">
          <div className="col-12 text-center h2 p-3 bg-dark text-light rounded m-0">
            Movies
          </div>
        </div>
        <div className="row">
          {data.movies.map((movie) => (
            <Item key={movie._id} itemData={movie} />
          ))}
        </div>
        <div className="row p-3">
          <div className="col-12 text-center h2 p-3 bg-dark text-light rounded">
            TV Series
          </div>
        </div>
        <div className="row">
          {data.tvSeries.map((oneTvSeries) => (
            <Item key={oneTvSeries._id} itemData={oneTvSeries} isTv={true} />
          ))}
        </div>
      </div>
    );
  }
}
