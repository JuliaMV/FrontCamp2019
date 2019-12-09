import React from 'react';
import PropTypes from 'prop-types';

import css from './Card.module.css';

const Card = ({
  img, title, genres, date,
}) => (
  <li className={css.card}>
    <img className={css.poster} src={img} alt="description" />
    <h3 className={css.title}>{title}</h3>
    <div className={css.meta}>
      <span className={css.genres}>{genres.join(' ')}</span>
      <span className={css.date}>{date}</span>
    </div>
  </li>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
