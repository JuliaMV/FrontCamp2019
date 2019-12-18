import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setFilm, clearFilm } from 'src/redux/actions/film';
import { setFilms, clearFilms } from 'src/redux/actions/films';

import Film from 'components/film/Film';
import Board from 'components/board/Board';
import Footer from 'components/footer/Footer';
import SortPanel from 'components/sortPanel/SortPanel';

import constants from 'src/constants';

const mapStateToProps = (state) => ({
  film: state.film.film[0],
  films: state.films.films,
  sort: state.sort.sort,
});

const mapDispatchToProps = (dispatch) => ({
  setFilmAction: (id, sort, callback) => {
    const url = `${constants.API}/movies/${id}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((film) => {
        const filter = 'genres';
        const urlFilms = `${constants.API}/movies?search=${film.genres.join('&')}&searchBy=${filter}&sortBy=${sort.split(' ').join('_')}&sortOrder=desc`;
        return fetch(urlFilms)
          .then((resp) => resp.json())
          .then((films) => {
            callback(true);
            dispatch([setFilm(film), setFilms(films.data)]);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  clearResults: () => {
    dispatch(clearFilm());
  },
});


const FilmPage = (props) => {
  const { film, sort, films, setFilmAction, clearResults } = props;
  const { id } = useParams();

  const [isLoad, updateLoad] = useState(false);

  // useEffect(() => {
  //   return clearResults();
  // });

  setFilmAction(id, sort, updateLoad);

  return isLoad ? (
    <>
      <Film {...film} />
      <div style={{ position: 'relative' }}>
        <SortPanel description={`Films by ${film.genres.join(' / ')}`} />
        <Board films={films} />
      </div>
      <Footer />
    </>
  ) : 'loading....';
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
