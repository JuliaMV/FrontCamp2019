/* eslint-disable camelcase */
import React from 'react';

import Card from '../card/Card';
import responce from '../../data/movies';

import css from './Board.module.css';

class Board extends React.Component {
  state = {
    films: [],
  };

  componentDidMount = () => {
    this.setState({
      films: responce.data.slice(),
    });
  }

  render = () => {
    const { films } = this.state;
    return (
      <ul className={css.container}>
        {films.map(({
          title, release_date, poster_path, genres,
        }) => <Card title={title} date={release_date} img={poster_path} genres={genres} />)}
      </ul>
    );
  }
}


export default Board;
