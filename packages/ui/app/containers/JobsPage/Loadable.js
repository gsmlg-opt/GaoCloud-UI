/**
 *
 * Asynchronously loads the component for JobsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "JobsPage" */ './index')
);

export const CreateJobPage = lazy(() =>
  import(/* webpackChunkName: "CreateJobPage" */ './CreatePage')
);

export const JobDetailPage = lazy(() =>
  import(/* webpackChunkName: "ShowJobPage" */ './ShowItemPage')
);
