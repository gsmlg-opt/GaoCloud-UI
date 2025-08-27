/**
 *
 * Asynchronously loads the component for ClustersPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ClustersPage" */ './index')
);

export const CreateClusterPage = lazy(() =>
  import(/* webpackChunkName: "CreateClusterPage" */ './CreatePage')
);

export const ClusterManagePage = lazy(() =>
  import(/* webpackChunkName: "ClusterManagePage" */ './ClusterManagePage')
);
