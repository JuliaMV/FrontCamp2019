/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from 'components/logo/Logo';
import SearchIcon from 'components/searchIcon/searchIcon';

import css from './Film.module.css';

const Film = ({
  poster_path, title, genres, release_date, vote_average, runtime, overview,
}) => (
  <div className={css.wrapper}>
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <Link to="/">
          <SearchIcon />
        </Link>
      </header>
      <main className={css.content}>
        <img className={css.poster} src={poster_path} alt="description" />
        <div>
          <div className={css.titleWrapper}>
            <h2 className={css.title}>{title}</h2>
            <span className={css.votes}>{vote_average}</span>
          </div>
          <p className={css.genres}>{genres.join(' ')}</p>
          <div className={css.meta}>
            <span className={css.year}>
              {new Date(release_date).getFullYear()}
            </span>
            <span className={css.time}>
              {`${runtime} min`}
            </span>
          </div>
          <p className={css.description}>{overview}</p>
        </div>
      </main>
    </div>
  </div>
);

Film.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
};

export default Film;
