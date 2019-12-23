/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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
    const { match: { params }, filmsData, loadFilms } = this.props
    if (params && filmsData.length === 0) {
      const { value, filter, sort, limit} = params
      const searchQuery = `search=${value}&searchBy=${filter}&sortBy=${sort.split(' ').join('_')}&sortOrder=desc&limit=${limit}`;
      loadFilms(searchQuery);
    }
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

MainPage.propTypes = {
  updateFilter: PropTypes.func.isRequired,
  loadFilms: PropTypes.func.isRequired,
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  limit: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  filmsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPage));
