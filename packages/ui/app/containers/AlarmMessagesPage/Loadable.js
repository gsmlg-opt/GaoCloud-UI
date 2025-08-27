/**
 *
 * Asynchronously loads the component for AlarmMessagesPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "AlarmMessagesPage" */ './index')
);
