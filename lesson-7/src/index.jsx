import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './pages/MainPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

const App = () => (
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <MainPage />
  </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('root'));
