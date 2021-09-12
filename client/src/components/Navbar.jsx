import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  return (
    <div className="col-12 p-3 bg-dark text-light">
      <div className="d-flex justify-content-between aling-items-center">
        <h1>EntertainMe</h1>
        <div className="d-flex align-items-center">
          <Link
            className={`${
              location.pathname === '/' ? 'link-light' : 'link-secondary'
            } text-decoration-none h4 m-0 me-3`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`${
              location.pathname === '/favorites'
                ? 'link-light'
                : 'link-secondary'
            } text-decoration-none h4 m-0 me-3`}
            to="/favorites"
          >
            Favorites
          </Link>
          <Link className="btn btn-light" to="/manage-movies">
            <i
              className={`bi ${
                location.pathname === '/manage-movies'
                  ? 'bi-gear-fill'
                  : 'bi-gear'
              }`}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
