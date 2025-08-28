/**
 *
 * Asynchronously loads the component for ConfigMapsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ConfigMapsPage" */ './index')
);

export const CreateConfigMapPage = lazy(() =>
  import(/* webpackChunkName: "CreateConfigMapPage" */ './CreateConfigMapPage')
);

export const ShowConfigMapPage = lazy(() =>
  import(/* webpackChunkName: "ShowConfigMapPage" */ './ShowConfigMapPage')
);

export const EditConfigMapPage = lazy(() =>
  import(/* webpackChunkName: "EditConfigMapPage" */ './EditConfigMapPage')
);
