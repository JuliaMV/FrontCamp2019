import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import { Provider } from 'react-redux';

import store from 'src/redux/store';

import ErrorBoundary from 'components/errorBoundary/ErrorBoundary';
import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import ErrorPage from './pages/ErrorPage';

import './index.css';

const history = syncHistoryWithStore(createBrowserHistory(), store);

const App = () => (
  <Provider store={store} history={history}>
    <Router>
      <ErrorBoundary fallback={<ErrorPage title="Something went wrong" />}>
        <Switch>
          <Route exact path="/" render={() => <MainPage />} />
          <Route exact path="/search/:text&searchBy=:searchBy&sortBy=:sortBy&sortOrder=desc&limit=:limit" render={() => <MainPage />} />
          <Route exact path="/film/:id" render={() => <FilmPage />} />
          <Route path="*" render={() => <ErrorPage title="404 Error. Page not found" />} />
        </Switch>
      </ErrorBoundary>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
