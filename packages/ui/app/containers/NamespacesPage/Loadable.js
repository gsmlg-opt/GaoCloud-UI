/**
 *
 * Asynchronously loads the component for NamespacesPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "NamespacesPage" */ './index')
);

export const CreateNamespacePage = lazy(() =>
  import(/* webpackChunkName: "CreateNamespacePage" */ './CreateNamespacePage')
);

export const NamespaceDetailPage = lazy(() =>
  import(/* webpackChunkName: "NamespaceDetailPage" */ './NamespaceDetailPage')
);

export const NamespaceOverviewPage = lazy(() =>
  import(
    /* webpackChunkName: "NamespaceOverviewPage" */ './NamespaceOverviewPage'
  )
);

export const NamespaceThresholdsPage = lazy(() =>
  import(
    /* webpackChunkName: "NamespaceThresholdsPage" */ './NamespaceThresholdsPage'
  )
);
