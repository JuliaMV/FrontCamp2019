import React from 'react';

import Logo from 'components/logo/Logo';
import Filter from 'components/filter/Filter';

import css from './Header.module.css';

const Header = () => (
  <header className={css.header}>
    <div className={css.container}>
      <h1 className={css.logoContainer}>
        <Logo />
      </h1>
      <h2 className={css.title}>Find your movie</h2>
      <form className={css.searchForm} action="" method="get">
        <input className={css.searchFormInput} type="text" name="search-input" id="search-input" />
        <button className={css.searchFormSubmit} type="submit">Search</button>
      </form>
      <div className={css.filtersWrapper}>
        <Filter title="search by" fields={['title', 'genre']} />
      </div>
    </div>
  </header>
);

export default Header;
