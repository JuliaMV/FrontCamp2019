import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const getFields = (field) => (
  <li key={field} className={css.filtersItem}>
    <button type="button" className={css.filtersButton}>{field}</button>
  </li>
);

const Filter = ({ title, fields }) => (
  <div className={css.filters}>
    <span className={css.title}>{ title }</span>
    <ul className={css.filtersList}>
      {fields.map(getFields)}
    </ul>
  </div>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;
