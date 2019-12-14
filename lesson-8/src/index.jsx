import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import store from 'redux/store';

import MainPage from './pages/MainPage';
// import FilmPage from './pages/FilmPage';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

const App = () => (
  <Provider store={store}>
    <ErrorBoundary fallback={<ErrorPage title="Something went wrong" />}>
      <MainPage />
      {/* <FilmPage /> */}
      {/* <ErrorPage title="Page not found" /> */}
    </ErrorBoundary>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
