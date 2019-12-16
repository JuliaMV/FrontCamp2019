import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Provider } from 'react-redux';

import store from 'src/redux/store';

import MainPage from './pages/MainPage';
import FilmPage from './pages/FilmPage';
import ErrorPage from './pages/ErrorPage';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

import './index.css';

const App = () => (
  <Router>
    <Provider store={store}>
      <ErrorBoundary fallback={<ErrorPage title="Something went wrong" />}>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/film/:id">
            <FilmPage />
          </Route>
          <Route>
            <ErrorPage title="Page not found" />
          </Route>
        </Switch>
      </ErrorBoundary>
    </Provider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
