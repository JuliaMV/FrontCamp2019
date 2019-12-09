import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './pages/MainPage';

import './index.css';

const App = () => (
  <MainPage />
);

ReactDOM.render(<App />, document.getElementById('root'));
