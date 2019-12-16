/* eslint-disable camelcase */
import React from 'react';

// import constants from 'src/constants';

import Card from 'components/card/Card';
import responce from '../../data/movies';


import css from './Board.module.css';

class Board extends React.Component {
  // state = {
  //   films: [],
  // };

  // componentDidMount() {
  //   this.setState({
  //     films: responce.data.slice(),
  //     // films: []
  //   });
  // }

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
    const { films } = this.props
    const content = films.length > 0 ? films.map(this.getCards)
      : this.noFilms();

    return (
      <ul className={css.container}>
        { content }
      </ul>
    );
  }
}


export default Board;
