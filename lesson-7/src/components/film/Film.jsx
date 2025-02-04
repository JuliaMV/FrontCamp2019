/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/logo/Logo';
import SearchIcon from 'components/searchIcon/searchIcon';

import css from './Film.module.css';

const Film = ({
  img, title, genres, date, vote_average, runtime, overview,
}) => (
  <div className={css.wrapper}>
    <div className={css.container}>
      <header className={css.header}>
        <Logo />
        <SearchIcon />
      </header>
      <main className={css.content}>
        <img className={css.poster} src={img} alt="description" />
        <div>
          <div className={css.titleWrapper}>
            <h2 className={css.title}>{title}</h2>
            <span className={css.votes}>{vote_average}</span>
          </div>
          <p className={css.genres}>{genres.join(' ')}</p>
          <div className={css.meta}>
            <span className={css.year}>
              {new Date(date).getFullYear()}
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
  title: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.string),
  img: PropTypes.string,
  date: PropTypes.string,
  vote_average: PropTypes.number,
  runtime: PropTypes.number,
  overview: PropTypes.string,
};

Film.defaultProps = {
  title: 'Gemini',
  genres: [
    'Mystery',
    'Thriller',
  ],
  img: 'https://image.tmdb.org/t/p/w500/oIltQs7MPk7VQFG3DJfgC63mShU.jpg',
  date: '2018-03-30',
  vote_average: 10,
  runtime: 92,
  overview: 'A heinous crime tests the complex relationship between a tenacious personal assistant and her Hollywood starlet boss. As the assistant travels across Los Angeles to unravel the mystery, she must stay one step ahead of a determined policeman and confront her own understanding of friendship, truth and celebrity.',
};

export default Film;
