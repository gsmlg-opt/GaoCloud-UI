/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for async function to generator support
import 'core-js/stable';
import 'regenerator-runtime/runtime.js';

// offline cache support
import * as OfflinePluginRuntime from 'offline-plugin/runtime.js';

// Import all the third party stuff
import React from 'react';
import { createRoot } from 'react-dom/client.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Import root app
import App from '../app/containers/App/index.js';

// Import Language Provider
import LanguageProvider from '../app/containers/LanguageProvider/index.js';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */

/* eslint-enable import/no-unresolved, import/extensions */

import store from './store.js';

// Import i18n messages
import { translationMessages } from './i18n.js';

const MOUNT_NODE = document.getElementById('app');

const render = (messages) => {
  const root = createRoot(MOUNT_NODE);
  root.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </Provider>
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise((resolve) => {
    resolve(import(/* webpackChunkName: "intl" */ 'intl'));
  })
    .then(() => (
      Promise.all([
        import(
          /* webpackChunkName: "intl.zh" */ 'intl/locale-data/jsonp/zh.js'
        ),
        import(
          /* webpackChunkName: "intl.en" */ 'intl/locale-data/jsonp/en.js'
        ),
      ])
    ))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
/* eslint-disable no-console */
if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onInstalled: () => {
      console.log('App is ready for offline usage!');
    },
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });
}
/* eslint-enable no-console */
