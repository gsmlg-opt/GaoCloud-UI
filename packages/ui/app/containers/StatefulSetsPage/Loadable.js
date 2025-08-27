/**
 *
 * Asynchronously loads the component for StatefulSetsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "StatefulSetsPage" */ './index')
);

export const CreateStatefulSetPage = lazy(() =>
  import(/* webpackChunkName: "CreateStatefulSetPage" */ './CreatePage')
);

export const StatefulSetDetailPage = lazy(() =>
  import(/* webpackChunkName: "StatefulSetDetailPage" */ './ShowItemPage')
);

export const UpdateStatefulSetPage = lazy(() =>
  import(/* webpackChunkName: "UpdateStatefulSetPage" */ './UpdatePage')
);
