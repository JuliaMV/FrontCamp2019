/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import Card from 'components/card/Card';

import css from './Board.module.css';

class Board extends React.Component {
  getCards = ({
    title, release_date, poster_path, genres, id,
  }) => (
    <Card
      title={title}
      date={release_date}
      img={poster_path}
      genres={genres}
      id={id}
      key={id}
    />
  );

  noFilms = () => (<li className={css.noFilms}>No films found</li>);

  render() {
    const { films } = this.props;
    const content = films.length > 0 ? films.map(this.getCards)
      : this.noFilms();

    return (
      <ul className={css.container}>
        { content }
      </ul>
    );
  }
}

Board.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Board;
