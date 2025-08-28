/**
 *
 * Asynchronously loads the component for CronJobsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "CronJobsPage" */ './index')
);

export const CreateCronJobPage = lazy(() =>
  import(/* webpackChunkName: "CreateCronJobPage" */ './CreatePage')
);

export const CronJobDetailPage = lazy(() =>
  import(/* webpackChunkName: "CronJobDetailPage" */ './ShowItemPage')
);
