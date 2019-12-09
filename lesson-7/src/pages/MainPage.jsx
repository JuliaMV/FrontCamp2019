import React from 'react';

import Board from '../components/board/Board';
import Header from '../components/header/Нeader';
import SortPanel from '../components/sortPanel/SortPanel';
import Footer from '../components/footer/Footer';

const MainPage = () => (
  <>
    <Header />
    <div>
      <SortPanel />
      <Board />
    </div>
    <Footer />
  </>
);

export default MainPage;
