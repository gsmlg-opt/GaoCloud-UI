/**
 *
 * Asynchronously loads the component for ApplicationStorePage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ApplicationStorePage" */ './index')
);

export const UsersApplicationStorePage = lazy(() =>
  import(/* webpackChunkName: "ApplicationStorePage" */ './index')
);
