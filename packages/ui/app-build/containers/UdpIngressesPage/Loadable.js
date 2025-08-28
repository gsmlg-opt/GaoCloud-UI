/**
 *
 * Asynchronously loads the component for UdpIngresses
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "UdpIngressesPage" */ './index')
);

export const CreateUdpIngressPage = lazy(() =>
  import(/* webpackChunkName: "CreateUdpIngressPage" */ './CreatePage')
);

export const ShowUdpIngressPage = lazy(() =>
  import(/* webpackChunkName: "ShowUdpIngressPage" */ './ShowItemPage')
);
