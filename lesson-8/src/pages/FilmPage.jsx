/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadFilmDescription } from 'src/redux/actions/filmPage';

import Film from 'components/film/Film';
import Board from 'components/board/Board';
import Footer from 'components/footer/Footer';
import SortPanel from 'components/sortPanel/SortPanel';


const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  console.log('ownProps', ownProps);
  return {
    filmDescription: state.filmPage.filmDescription,
    suggestedFilms: state.filmPage.suggestedFilms,
    isLoading: state.filmPage.isLoading,
    sort: state.mainPage.sort,
    filter: state.mainPage.filter,
    id: ownProps.match.params.id,
  };
};

const mapDispatchToProps = {
  loadFilmDescription,
};


class FilmPage extends React.PureComponent {
  componentDidMount() {
    console.log('this.props', this.props);
    const {
      id, loadFilmDescription, filter, sort,
    } = this.props;
    loadFilmDescription({ id, filter, sort });
  }

  render() {
    const { filmDescription, suggestedFilms, isLoading } = this.props;
    // return null;

    return isLoading ? '<p>loading</p>' : (
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
