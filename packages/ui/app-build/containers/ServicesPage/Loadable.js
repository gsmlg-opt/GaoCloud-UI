/**
 *
 * Asynchronously loads the component for ServicesPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ServicesPage" */ './index')
);

export const CreateServicePage = lazy(() =>
  import(/* webpackChunkName: "CreateServicePage" */ './CreatePage')
);

export const ShowServicePage = lazy(() =>
  import(/* webpackChunkName: "ShowServicePage" */ './ShowItemPage')
);
