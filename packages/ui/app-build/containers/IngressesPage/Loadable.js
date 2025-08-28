/**
 *
 * Asynchronously loads the component for Ingress
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "IngressesPage" */ './index')
);

export const CreateIngressPage = lazy(() =>
  import(/* webpackChunkName: "CreateIngressPage" */ './CreatePage')
);

export const ShowIngressPage = lazy(() =>
  import(/* webpackChunkName: "ShowIngressPage" */ './ShowItemPage')
);
