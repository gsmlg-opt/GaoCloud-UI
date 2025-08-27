/**
 *
 * Asynchronously loads the component for DaemonSetsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "DaemonSetsPage" */ './index')
);

export const CreateDaemonSetPage = lazy(() =>
  import(/* webpackChunkName: "CreateDaemonSetPage" */ './CreatePage')
);

export const DaemonSetDetailPage = lazy(() =>
  import(/* webpackChunkName: "DaemonSetDetailPage" */ './ShowItemPage')
);

export const UpdateDaemonSetPage = lazy(() =>
  import(/* webpackChunkName: "UpdateDaemonSetPage" */ './UpdatePage')
);
