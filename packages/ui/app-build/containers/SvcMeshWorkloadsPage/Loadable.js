/**
 *
 * Asynchronously loads the component for SvcMeshWorkloadsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "SvcMeshWorkloadsPage" */ './index')
);

export const ShowSvcMeshWorkloadPage = lazy(() =>
  import(/* webpackChunkName: "ShowSvcMeshWorkloadPage" */ './ShowItemPage')
);
