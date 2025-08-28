/**
 *
 * Asynchronously loads the component for GlobalConfigurationPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "GlobalConfigurationPage" */ './index')
);
