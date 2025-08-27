/**
 *
 * Asynchronously loads the component for PersistentVolumeClaimsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "PersistentVolumeClaimsPage" */ './index')
);
