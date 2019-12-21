/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import { mainPageLimit } from 'src/config';

import {
  updateSort, updateFilter, updateAmount, loadFilms,
} from 'src/redux/actions/mainPage';

import Board from 'components/board/Board';
import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';
import Loader from 'components/loader/Loader';

const mapStateToProps = (state, ownProps) => ({
  sort: state.mainPage.sort,
  filter: state.mainPage.filter,
  filmsData: state.mainPage.filmsData,
  amount: state.mainPage.amount,
  limit: state.mainPage.limit,
  isLoading: state.mainPage.isLoading,
  ...ownProps,
});


const mapDispatchToProps = {
  updateSort, updateFilter, updateAmount, loadFilms,
};


class MainPage extends React.PureComponent {
  componentDidMount() {
    console.log(this.props);
  }

  filterHandler = (value) => {
    const { updateFilter } = this.props;
    updateFilter(value);
  }

  sortHandler = (value) => {
    const { updateSort } = this.props;
    updateSort(value);
  }

  filmsHandler = (value) => {
    const {
      loadFilms, sort, filter, history, limit,
    } = this.props;
    const searchQuery = `search=${value}&searchBy=${filter}&sortBy=${sort.split(' ').join('_')}&sortOrder=desc&limit=${limit}`;
    history.push((`/search/${searchQuery}`));

    loadFilms(searchQuery);
  }

  render() {
    const {
      filmsData, filter, sort, amount, isLoading,
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
          <Board films={filmsData} />
        </div>
        <Footer />
        { isLoading && <Loader />}
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
