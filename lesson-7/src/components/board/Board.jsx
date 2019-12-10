/* eslint-disable camelcase */
import React from 'react';

import Card from 'components/card/Card';
import responce from '../../data/movies';

import css from './Board.module.css';

class Board extends React.Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({
      films: responce.data.slice(),
    });
  }

  getCards = ({
    title, release_date, poster_path, genres, id,
  }) => (<Card title={title} date={release_date} img={poster_path} genres={genres} id={id} />);

  render() {
    const { films } = this.state;
    return (
      <ul className={css.container}>
        {films.slice(0, 6).map(this.getCards)}
      </ul>
    );
  }
}


export default Board;
