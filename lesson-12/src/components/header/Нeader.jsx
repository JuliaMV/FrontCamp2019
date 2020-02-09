import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/logo/Logo';
import Filter from 'components/filter/Filter';

import css from './Header.module.css';

const Header = (props) => {
  const { activeFilter, filterHandler } = props;
  const [state, updateState] = useState('');
  const handleChange = (event) => {
    const { value } = event.target;
    updateState(value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { filmsHandler } = props;
    filmsHandler(state);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <h1 className={css.logoContainer}>
          <Logo />
        </h1>
        <h2 className={css.title}>Find your movie</h2>
        <form className={css.searchForm} action="" method="get" onSubmit={handleSubmit}>
          <input className={css.searchFormInput} type="text" name="search-input" id="search-input" onChange={handleChange} />
          <button className={css.searchFormSubmit} type="submit">Search</button>
        </form>
        <div className={css.filtersWrapper}>
          <Filter title="search by" fields={['title', 'genre']} activeFilter={activeFilter} filterHandler={filterHandler} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  activeFilter: PropTypes.string,
  filterHandler: PropTypes.func,
  filmsHandler: PropTypes.func,
};

Header.defaultProps = {
  activeFilter: 'title',
  filterHandler: () => {},
  filmsHandler: () => {},
};

export default Header;
