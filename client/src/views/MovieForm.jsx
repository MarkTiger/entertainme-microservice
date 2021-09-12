import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const CREATE_MOVIE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation CreateMovie($createMoviePayload: MovieInput) {
    createMovie(payload: $createMoviePayload)
  }
`;

const EDIT_MOVIE = gql`
  # Increments a back-end counter and gets its resulting value
  mutation UpdateMovie($updateMovieId: ID!, $updateMoviePayload: MovieInput) {
    updateMovie(id: $updateMovieId, payload: $updateMoviePayload)
  }
`;

export default function MovieForm() {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [poster_path, setPosterPath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tags, setTags] = useState('');
  const [titleErr, setTitleErr] = useState(false);
  const [overviewErr, setOverviewErr] = useState(false);
  const [posterErr, setPosterErr] = useState(false);
  const [popularityErr, setPopularityErr] = useState(false);
  const [tagsErr, setTagsErr] = useState(false);

  const params = useParams();
  const history = useHistory();

  const [formFunction] = useMutation(
    params.hasOwnProperty('id') ? EDIT_MOVIE : CREATE_MOVIE
  );

  const checkForm = () => {
    if (!title) {
      setTitleErr(true);
    } else {
      setTitleErr(false);
    }
    if (!overview) {
      setOverviewErr(true);
    } else {
      setOverviewErr(false);
    }
    if (!poster_path) {
      setPosterErr(true);
    } else {
      setPosterErr(false);
    }
    if (!popularity || Number(popularity) < 0 || Number(popularity) > 10) {
      setPopularityErr(true);
    } else {
      setPopularityErr(false);
    }
    if (!tags) {
      setTagsErr(true);
    } else {
      setTagsErr(false);
    }
  };

  let handleSubmit;

  if (params.hasOwnProperty('id')) {
    handleSubmit = (e) => {
      e.preventDefault();

      const payload = {
        title,
        overview,
        poster_path,
        popularity: Number(popularity),
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : null,
      };
      console.log(payload);
    };
  } else {
    handleSubmit = (e) => {
      e.preventDefault();
      checkForm();

      const payload = {
        title,
        overview,
        poster_path,
        popularity: Number(popularity),
        tags: tags ? tags.split(',').map((tag) => tag.trim()) : null,
      };

      if (
        title &&
        overview &&
        poster_path &&
        tags &&
        popularity &&
        Number(popularity) >= 0 &&
        Number(popularity) <= 10
      ) {
        formFunction({
          variables: {
            createMoviePayload: payload,
          },
          refetchQueries: ['GetMovies'],
        });

        history.push('/manage-movies');
      }
    };
  }

  const handleTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleOverview = (e) => {
    setOverview(e.currentTarget.value);
  };

  const handlePoster = (e) => {
    setPosterPath(e.currentTarget.value);
  };

  const handlePopularity = (e) => {
    setPopularity(e.currentTarget.value);
  };

  const handleTags = (e) => {
    setTags(e.currentTarget.value);
  };

  return (
    <div className="col-12 bg-secondary p-3">
      <div className="bg-dark p-3 rounded text-light">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
              {titleErr ? (
                <span className="text-danger"> Cannot be empty</span>
              ) : (
                ''
              )}
            </label>
            <input
              value={title}
              onChange={handleTitle}
              type="text"
              className="form-control"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="overview" className="form-label">
              Overview
              {overviewErr ? (
                <span className="text-danger"> Cannot be empty</span>
              ) : (
                ''
              )}
            </label>
            <textarea
              value={overview}
              onChange={handleOverview}
              className="form-control"
              id="overview"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="poster" className="form-label">
              Poster
              {posterErr ? (
                <span className="text-danger"> Cannot be empty</span>
              ) : (
                ''
              )}
            </label>
            <input
              value={poster_path}
              onChange={handlePoster}
              type="text"
              className="form-control"
              id="poster"
            />
          </div>
          <div className="mb-3 d-flex">
            <div className="w-25 pe-2">
              <label htmlFor="popularity" className="form-label">
                Popularity
                {popularityErr ? (
                  <span className="text-danger"> Must be between 1 to 10</span>
                ) : (
                  ''
                )}
              </label>
              <input
                value={popularity}
                onChange={handlePopularity}
                type="number"
                className="form-control"
                id="popularity"
              />
            </div>
            <div className="w-75 ps-2">
              <label htmlFor="tags" className="form-label">
                Tags <span className="text-info">*Separated with comma</span>
                {tagsErr ? (
                  <span className="text-danger"> Cannot be empty</span>
                ) : (
                  ''
                )}
              </label>
              <input
                value={tags}
                onChange={handleTags}
                type="text"
                className="form-control"
                id="tags"
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-secondary">
              {params.hasOwnProperty('id') ? 'Edit' : 'Add New'} Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
