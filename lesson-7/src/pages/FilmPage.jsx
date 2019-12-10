import React from 'react';

import Film from 'components/film/Film';
import Board from 'components/board/Board';
import Footer from 'components/footer/Footer';
import SortPanel from '../components/sortPanel/SortPanel';

const FilmPage = () => (
  <>
    <Film />
    <div style={{ position: 'relative' }}>
      <SortPanel description="Films by Drama genre" />
      <Board />
    </div>
    <Footer />
  </>
);

export default FilmPage;
