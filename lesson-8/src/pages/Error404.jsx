import React from 'react';

import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';
import Title404 from '../components/title404/title404';


const Error404 = () => (
  <>
    <Header />
    <div style={{ position: 'relative' }}>
      <SortPanel description="7 films found" isFilter />
      <Title404 />
    </div>
    <Footer />
  </>
);

export default Error404;
