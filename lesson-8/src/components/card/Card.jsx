import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './Card.module.css';

const Card = ({
  img, title, genres, date, id,
}) => {
  return (
    <li className={css.card} key={id}>
      <Link to={`/film/${id}`}>
        <img className={css.poster} src={img} alt="description" />
      </Link>
      <div className={css.info}>
        <div className={css.meta}>
          <h3 className={css.title}>{title}</h3>
          <span className={css.genres}>{genres.join(' ')}</span>
        </div>
        <span className={css.date}>{new Date(date).getFullYear()}</span>
      </div>
    </li>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
