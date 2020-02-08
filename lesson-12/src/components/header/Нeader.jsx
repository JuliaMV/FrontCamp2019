import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/logo/Logo';
import Filter from 'components/filter/Filter';

import css from './Header.module.css';

class Header extends React.PureComponent {
  state = {
    value: '',
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { filmsHandler } = this.props;
    const { value } = this.state;
    filmsHandler(value);
  }

  render() {
    const { activeFilter, filterHandler } = this.props;
    return (
      <header className={css.header}>
        <div className={css.container}>
          <h1 className={css.logoContainer}>
            <Logo />
          </h1>
          <h2 className={css.title}>Find your movie</h2>
          <form className={css.searchForm} action="" method="get" onSubmit={this.handleSubmit}>
            <input className={css.searchFormInput} type="text" name="search-input" id="search-input" onChange={this.handleChange} />
            <button className={css.searchFormSubmit} type="submit">Search</button>
          </form>
          <div className={css.filtersWrapper}>
            <Filter title="search by" fields={['title', 'genre']} activeFilter={activeFilter} filterHandler={filterHandler} />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired,
  filmsHandler: PropTypes.func.isRequired,
};

export default Header;
