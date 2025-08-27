/**
 *
 * Asynchronously loads the component for EventsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "EventsPage" */ './index')
);
