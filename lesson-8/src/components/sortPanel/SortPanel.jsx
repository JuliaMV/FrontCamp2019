import React from 'react';
import PropTypes from 'prop-types';

import Filter from 'components/filter/Filter';
import css from './SortPanel.module.css';

const SortPanel = (props) => {
  const {
    description, isFilter, activeFilter, filterHandler,
  } = props;
  let filter = null;
  if (isFilter) {
    filter = <Filter title="sort by" fields={['release date', 'rating']} activeFilter={activeFilter} filterHandler={filterHandler} />;
  }
  console.log(props);
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <p className={css.description}>{description}</p>
        {filter}
      </div>
    </div>
  );
};


SortPanel.propTypes = {
  description: PropTypes.string.isRequired,
  isFilter: PropTypes.bool,
  activeFilter: PropTypes.string,
  filterHandler: PropTypes.func,
};

SortPanel.defaultProps = {
  isFilter: false,
  activeFilter: '',
  filterHandler: () => {},
};

export default SortPanel;
