import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from 'components/header/Нeader';
import SortPanel from 'components/sortPanel/SortPanel';
import Footer from 'components/footer/Footer';
import ErrorTitle from 'components/errorTitle/ErrorTitle';


const ErrorPage = ({ title }) => (
  <>
    <Header />
    <div style={{ position: 'relative' }}>
      <SortPanel description="" isFilter />
      <ErrorTitle title={title} />
    </div>
    <Footer />
  </>
);

ErrorPage.propTypes = {
  title: PropTypes.string.isRequired,
};


export default withRouter(ErrorPage);
