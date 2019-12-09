import React from 'react';
import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ title, fields }) => (
  <div className={css.filters}>
    <span className={css.title}>{ title }</span>
    <ul className={css.filtersList}>
      {fields.map((field) => (
        <li key={field} className={css.filtersItem}>
          <button type="button" className={css.filtersButton}>{field}</button>
        </li>
      ))}
    </ul>
  </div>
);

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  // align: PropTypes.string,
};

// Filter.defaultProps = {
//   align: 'left',
// };


export default Filter;
