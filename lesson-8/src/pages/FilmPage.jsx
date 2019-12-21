/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilmPage));
