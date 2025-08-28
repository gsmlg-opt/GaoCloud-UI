/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import GlobalStyle from 'global-styles.js';
import theme from 'theme.js';
import LoginPage from '../LoginPage/Loadable.js';
import ErrorDialog from '../ErrorDialog/index.js';

import * as roleActions from '../../ducks/role/actions.js';

import Dashboard from './Dashboard.js';

class App extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.error(error, info); // eslint-disable-line
  }

  componentDidMount() {
    const { loadRole } = this.props;
    loadRole('/web/role');
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>{`${this.state.error}`}</pre>
        </div>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Routes>
            <Route path="/login" component={LoginPage} exact />
            <Route component={Dashboard} />
          </Routes>
          <ErrorDialog />
          <GlobalStyle />
        </Fragment>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...roleActions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
