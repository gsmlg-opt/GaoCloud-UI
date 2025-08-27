/**
 *
 * Asynchronously loads the component for ClusterDetailPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ClusterDetailPage" */ './index')
);

export const ClusterThresholdsPage = lazy(() =>
  import(
    /* webpackChunkName: "ClusterThresholdsPage" */ './ClusterThresholdsPage'
  )
);
