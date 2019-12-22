import React from 'react';
import { Link } from 'react-router-dom';

import css from './Logo.module.css';

const Logo = () => (
  <Link className={css.logo} to="/">
    netlix
    <span>roulette</span>
  </Link>
);

export default Logo;
