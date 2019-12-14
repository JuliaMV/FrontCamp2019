import React from 'react';
import PropTypes from 'prop-types';

import css from './ErrorTitle.module.css';

const ErrorTitle = ({ title }) => (
  <p className={css.title}>{ title }</p>
);

ErrorTitle.propTypes = {
  title: PropTypes.string.isRequired,
};


export default ErrorTitle;
