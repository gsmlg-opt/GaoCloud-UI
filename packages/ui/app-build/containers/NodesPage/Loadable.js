/**
 *
 * Asynchronously loads the component for NodesPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "NodesPage" */ './index')
);

export const NodeDetailPage = lazy(() =>
  import(/* webpackChunkName: "NodeDetailPage" */ './ShowItemPage')
);
