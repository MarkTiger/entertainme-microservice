import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import ItemRow from '../components/ItemRow';
import { ToastContainer } from 'react-toastify';
import { GET_MOVIES } from '../helpers/queries';

export default function ManageMovies() {
  const { loading, error, data } = useQuery(GET_MOVIES);

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
      <div className="bg-secondary p-3">
        <div className="row p-3">
          <ToastContainer />
          <div className="col-12 p-3 bg-dark text-light rounded d-flex align-items-center justify-content-between">
            <h4>Movies</h4>
            <Link className="btn btn-light" to="/manage-movies/add">
              <i className="bi bi-film"></i> Add Movie
            </Link>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-12 p-0">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Overview</th>
                  <th scope="col">Poster</th>
                  <th scope="col">Popularity</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.movies.map((movie, i) => {
                  return (
                    <ItemRow
                      key={movie._id + 'itemManage' + i}
                      itemData={movie}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
