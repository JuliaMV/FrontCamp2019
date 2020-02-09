import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const getFields = (fields, activeFilter, filterHandler) => fields.map((field) => (
  <li key={field} className={css.filtersItem}>
    <button type="button" className={field === activeFilter ? css.filtersButtonActive : css.filtersButton} onClick={() => filterHandler(field)}>{field}</button>
  </li>
));

const Filter = (props) => {
  const {
    title, fields, activeFilter, filterHandler,
  } = props;
  const fildsList = getFields(fields, activeFilter, filterHandler);

  return (
    <div className={css.filters}>
      <span className={css.title}>{ title }</span>
      <ul className={css.filtersList}>
        {fildsList}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  activeFilter: PropTypes.string,
  filterHandler: PropTypes.func,
};

Filter.defaultProps = {
  title: 'Search by',
  fields: ['title', 'genre'],
  activeFilter: 'title',
  filterHandler: () => {},
};

export default Filter;
