/**
 *
 * Asynchronously loads the component for LoginPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "LoginPage" */ './index.js')
);
