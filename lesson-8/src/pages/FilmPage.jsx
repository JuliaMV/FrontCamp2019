import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setFilm, setFilms } from 'src/redux/actions/film';

import Film from 'components/film/Film';
import Board from 'components/board/Board';
import Footer from 'components/footer/Footer';
import SortPanel from 'components/sortPanel/SortPanel';

import constants from 'src/constants';

const mapStateToProps = (state) => ({
  film: state.film.film,
});

const mapDispatchToProps = (dispatch) => ({
  setFilmAction: (id, isLoadFilm, callback) => {
    if (isLoadFilm) {
      return;
    }
    const url = `${constants.API}/movies/${id}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setFilm(data));
        callback(true);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  setFilmsAction: (genres, callback) => {
    const filter = 'genres';
    const url = `${constants.API}/movies?search=${genres.pop()}&searchBy=${filter}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setFilms(data.data.slice(0, 6));
        callback(true);
      })
      .catch((error) => {
        console.log(error);
      })
  },
});

const FilmPage = (props) => {
  const { film, setFilmAction } = props;
  const [isLoadFilm, updateLoadFilm] = useState(false);
  const { id } = useParams();

  setFilmAction(id, isLoadFilm, updateLoadFilm);

  // isLoadFilm && setFilmsAction(film.genres, isLoad, updateLoad);

  return isLoadFilm ? (
    <>
      <Film {...film} />
      <div style={{ position: 'relative' }}>
        <SortPanel description={`Films by ${film.genres.pop()}`} />
        <Board films={[]} />
      </div>
      <Footer />
    </>
  ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
