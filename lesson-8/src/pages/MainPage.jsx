/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import constants from 'src/constants';

import { setFilter } from 'src/redux/actions/filter';
import { setSort } from 'src/redux/actions/sort';
import { setFilms, setAmount } from 'src/redux/actions/films';

import Board from 'components/board/Board';
import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';

const mapStateToProps = (state) => ({
  films: state.films.films,
  amount: state.films.amount,
  filter: state.filter.filter,
  sort: state.sort.sort,
});


const mapDispatchToProps = (dispatch) => ({
  setFilterAction: (filter) => dispatch(setFilter(filter)),
  setSortAction: (sort) => dispatch(setSort(sort)),
  setFilmsAction: (films) => dispatch(setFilms(films)),
  setAmountAction: (value) => dispatch(setAmount(value)),
});


class MainPage extends React.PureComponent {
  filterHandler = (value) => {
    const { setFilterAction } = this.props;
    setFilterAction(value);
  }

  sortHandler = (value) => {
    const { setSortAction } = this.props;
    setSortAction(value);
  }

  filmsHandler = (value) => {
    const searchText = encodeURIComponent(value).replace(/%20/g, '+');
    this.fetchFilms(searchText);
  }

  fetchFilms = (searchText) => {
    const {
      filter, sort, setFilmsAction, setAmountAction,
    } = this.props;
    const url = `${constants.API}/movies?search=${searchText}&searchBy=${filter}&sortBy=${sort.split(' ').join('_')}&sortOrder=desc`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setAmountAction(data.total);
        setFilmsAction(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      films, filter, sort, amount,
    } = this.props;

    return (
      <>
        <Header
          activeFilter={filter}
          filterHandler={this.filterHandler}
          filmsHandler={this.filmsHandler}
        />
        <div style={{ position: 'relative' }}>
          <SortPanel
            description={`${amount} films found`}
            isFilter
            activeFilter={sort}
            filterHandler={this.sortHandler}
          />
          <Board films={films} />
        </div>
        <Footer />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
