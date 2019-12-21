import React from 'react';

import css from './Loader.module.css';

const Loader = () => (
  <div className={css.overlay}>
    <div className={css.overlay_inner}>
      <div className={css.overlay_content}>
        <span className={css.loader} />
      </div>
    </div>
  </div>
);

export default Loader;
