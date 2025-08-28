/**
 *
 * Asynchronously loads the component for SvcMeshTapPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "SvcMeshTapPage" */ './index')
);
