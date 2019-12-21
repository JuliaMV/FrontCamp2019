/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
// import {
//   Router, Route, browserHistory, Switch,
// } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';

import { Provider } from 'react-redux';

import store from 'src/redux/store';

import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

const history = syncHistoryWithStore(createBrowserHistory(), store);

const App = () => (
  <Provider store={store} history={history}>
    <Router>
      <ErrorBoundary fallback={<ErrorPage title="Something went wrong" />}>
        <Switch>
          <Route exact path="/film/:id" render={() => <FilmPage />} />
          <Route exact path="/" render={() => <MainPage />} />
          <Route exact path="/search/:text&searchBy=:searchBy&sortBy=:sortBye&sortOrder=desc&limit=:limit" render={() => <MainPage />} />
          <Route render={() => <ErrorPage title="Page not found" />} />
        </Switch>
      </ErrorBoundary>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
