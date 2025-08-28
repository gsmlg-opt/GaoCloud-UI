/**
 *
 * Asynchronously loads the component for ServiceLinkPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "ServiceLinkPage" */ './index')
);
