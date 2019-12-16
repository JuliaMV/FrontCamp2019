/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from 'src/redux/actions/filter';
import { setSort } from 'src/redux/actions/sort';
import { setFilms } from 'src/redux/actions/films';

import Board from 'components/board/Board';
import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';

const mapStateToProps = (state) => ({
  films: state.films.films,
  filter: state.filter.filter,
  sort: state.sort.sort,
});


const mapDispatchToProps = (dispatch) => ({
  setFilterAction: (filter) => dispatch(setFilter(filter)),
  setSortAction: (sort) => dispatch(setSort(sort)),
  setFilmsAction: (films) => dispatch(setFilms(films)),
});


class MainPage extends React.PureComponent {
  componentDidMount() {
    //fetch will be here
  }

  filterHandler = (value) => {
    const { setFilterAction } = this.props;
    setFilterAction(value);
  }

  sortHandler = (value) => {
    const { setSortAction } = this.props;
    setSortAction(value);
  }

  filmsHandler = (value) => {
    const { setFilmsAction } = this.props;
    setFilmsAction(value);
  }


  render() {
    const { films, filter, sort } = this.props;
    console.log(this.props);

    return (
      <>
        <Header activeFilter={filter} filterHandler={this.filterHandler} />
        <div style={{ position: 'relative' }}>
          <SortPanel description={`${films.length} films found`} isFilter activeFilter={sort} filterHandler={this.sortHandler} />
          <Board films={films} />
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
