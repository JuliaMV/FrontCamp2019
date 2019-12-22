/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loadFilmDescription } from 'src/redux/actions/filmPage';

import Film from 'components/film/Film';
import Board from 'components/board/Board';
import Footer from 'components/footer/Footer';
import SortPanel from 'components/sortPanel/SortPanel';
import Loader from 'components/loader/Loader';


const mapStateToProps = (state, ownProps) => (
  {
    filmDescription: state.filmPage.filmDescription,
    suggestedFilms: state.filmPage.suggestedFilms,
    isLoading: state.filmPage.isLoading,
    sort: state.mainPage.sort,
    filter: state.mainPage.filter,
    id: ownProps.match.params.id,
  }
);

const mapDispatchToProps = {
  loadFilmDescription,
};

class FilmPage extends React.PureComponent {
  state = {
    id: null,
  }

  componentDidMount() {
    const {
      id, loadFilmDescription, filter, sort,
    } = this.props;
    loadFilmDescription({ id, filter, sort });
    this.setState({
      id,
    });
  }

  componentDidUpdate() {
    const { id: nextId } = this.props;
    const { id } = this.state;
    if (id !== nextId) {
      const { filter, sort, loadFilmDescription } = this.props;
      loadFilmDescription({ id: nextId, filter, sort });
      this.setState({
        id: nextId,
      });
    }
  }

  render() {
    const { filmDescription, suggestedFilms, isLoading } = this.props;

    return isLoading ? <Loader /> : (
      <>
        <Film {...filmDescription} />
        <div style={{ position: 'relative' }}>
          <SortPanel description={`Films by ${filmDescription.genres.join(' / ')}`} />
          <Board films={suggestedFilms} />
        </div>
        <Footer />
      </>
    );
  }
}

FilmPage.propTypes = {
  filmDescription: PropTypes.shape(
    {
      title: PropTypes.string.isRequired,
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      poster_path: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      runtime: PropTypes.number.isRequired,
      overview: PropTypes.string.isRequired,
    },
  ).isRequired,
  suggestedFilms: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  loadFilmDescription: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilmPage));
