import React from 'react';

import Logo from '../logo/Logo';
import Filter from '../filter/Filter';

import css from './Header.module.css';

const Header = () => (
  <header className={css.header}>
    <div className={css.container}>
      <h1>
        <Logo />
      </h1>
      <h2 className={css.title}>Find your movie</h2>
      <form action="" method="get">
        <input type="text" name="search-input" id="search-input" />
        <button type="submit">Search</button>
      </form>
      <Filter title="search by" fields={['title', 'genre']} align="left" />
    </div>
  </header>
);

export default Header;
