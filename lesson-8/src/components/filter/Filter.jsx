import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const getFields = (fields, activeFilter, filterHandler) => {
  console.log(fields, activeFilter, filterHandler);
  return fields.map((field) => (
    <li key={field} className={css.filtersItem}>
      <button type="button" className={field === activeFilter ? css.filtersButtonActive : css.filtersButton} onClick={() => filterHandler(field)}>{field}</button>
    </li>
  ));
};

const Filter = (props) => {
  const {
    title, fields, activeFilter, filterHandler,
  } = props;
  console.log(props);
  const fildsList = getFields(fields, activeFilter, filterHandler);
  console.log(fildsList);
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
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeFilter: PropTypes.string.isRequired,
  filterHandler: PropTypes.func.isRequired,
};

export default Filter;
