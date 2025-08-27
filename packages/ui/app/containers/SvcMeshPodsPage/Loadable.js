/**
 *
 * Asynchronously loads the component for SvcMeshPodsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "SvcMeshPodsPage" */ './index')
);
