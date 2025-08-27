/**
 * Asynchronously loads the component for NotFoundPage
 */
import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ './index')
);
