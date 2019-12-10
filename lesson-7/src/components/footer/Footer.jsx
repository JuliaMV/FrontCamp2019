import React from 'react';

import Logo from 'components/logo/Logo';

import css from './Footer.module.css';

const Footer = () => (
  <footer className={css.footer}>
    <div className={css.container}>
      <Logo />
    </div>
  </footer>
);

export default Footer;
