import React from 'react';
import PropTypes from 'prop-types';

import Filter from 'components/filter/Filter';
import css from './SortPanel.module.css';

const SortPanel = ({ description, isFilter }) => (
  <div className={css.wrapper}>
    <div className={css.container}>
      <p className={css.description}>{description}</p>
      {isFilter && <Filter title="sort by" fields={['release date', 'rating']} />}
    </div>
  </div>
);


SortPanel.propTypes = {
  description: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
};

SortPanel.defaultProps = {
  isFilter: false,
};

export default SortPanel;
