/**
 *
 * Asynchronously loads the component for HPAPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "HPAPage" */ './index')
);

export const CreateHPAPage = lazy(() =>
  import(/* webpackChunkName: "CreateHPAPage" */ './CreatePage')
);

export const UpdateHPAPage = lazy(() =>
  import(/* webpackChunkName: "UpdateHPAPage" */ './UpdatePage')
);

export const ShowHPAPage = lazy(() =>
  import(/* webpackChunkName: "ShowHPAPage" */ './ShowItemPage')
);
