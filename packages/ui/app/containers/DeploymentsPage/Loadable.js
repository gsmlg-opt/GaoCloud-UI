/**
 *
 * Asynchronously loads the component for DeploymentsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "DeploymentsPage" */ './index')
);

export const CreateDeploymentPage = lazy(() =>
  import(/* webpackChunkName: "CreateDeploymentPage" */ './CreatePage')
);

export const DeploymentDetailPage = lazy(() =>
  import(/* webpackChunkName: "DeploymentDetailPage" */ './ShowItemPage')
);

export const UpdateDeploymentPage = lazy(() =>
  import(/* webpackChunkName: "UpdateDeploymentPage" */ './UpdatePage')
);
