import React from 'react';
import Filter from '../filter/Filter.jsx';

const Header = () => (
  <header>
    <h1>
      <a href="./index.html">
        <img src="" alt="netflixroulette" />
      </a>
    </h1>
    <h2>Find your movie</h2>
    <form action="" method="get">
      <input type="text" name="search-input" id="search-input" />
      <button type="submit">Search</button>
    </form>
    <Filter title="search by" fields={['title', 'genre']} align="left" />
  </header>
);

export default Header;
