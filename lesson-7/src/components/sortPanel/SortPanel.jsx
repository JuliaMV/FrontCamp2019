import React from 'react';

import Filter from '../filter/Filter';
import css from './SortPanel.module.css';

const SortPanel = () => (
  <div className={css.container}>
    <p className={css.description}>7 movie found</p>
    <Filter title="sort by" fields={['release date', 'rating']} />
  </div>
);

export default SortPanel;
