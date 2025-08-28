/**
 *
 * Asynchronously loads the component for NetworkPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "NetworkPage" */ './index')
);
