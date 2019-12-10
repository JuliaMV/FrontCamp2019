import React from 'react';
import ReactDOM from 'react-dom';

// import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

const App = () => (
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    {/* <MainPage /> */}
    <FilmPage />
  </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('root'));
