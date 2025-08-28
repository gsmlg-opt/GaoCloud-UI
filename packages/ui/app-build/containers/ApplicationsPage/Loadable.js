/**
 *
 * Asynchronously loads the component for ApplicationsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ApplicationsPage" */ './index')
);

export const ApplicationDetailPage = lazy(() =>
  import(
    /* webpackChunkName: "ApplicationDetailPage" */ './ApplicationDetailPage'
  )
);

export const CreateApplicationPage = lazy(() =>
  import(
    /* webpackChunkName: "CreateApplicationPage" */ './CreateApplicationPage'
  )
);
