import React from 'react';
import Filter from '../filter/Filter.jsx';

const SortPanel = () => (
  <div>
    <p>7 movie found</p>
    <Filter title="sort by" fields={['release date', 'rating']} />
  </div>
);

export default SortPanel;
