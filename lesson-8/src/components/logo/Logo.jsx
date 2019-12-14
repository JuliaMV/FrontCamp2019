/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import css from './Logo.module.css';

const Logo = () => (
  <a className={css.logo} href="./index.html">
    netlix<span>roulette</span>
  </a>
);

export default Logo;
