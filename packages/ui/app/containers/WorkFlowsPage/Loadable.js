/**
 *
 * Asynchronously loads the component for WorkFlowsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() => import(/* webpackChunkName: "WorkFlowsPage" */'./index'));

export const CreateWorkFlowPage = lazy(() => import(/* webpackChunkName: "CreateWorkFlowPage" */'./CreatePage'));

export const UpdateWorkFlowPage = lazy(() => import(/* webpackChunkName: "UpdateWorkFlowPage" */'./UpdatePage'));

export const ShowWorkFlowPage = lazy(() => import(/* webpackChunkName: "ShowWorkFlowPage" */'./ShowItemPage'));

export const LogsPage = lazy(() => import(/* webpackChunkName: "ShowWorkFlowPage" */'./LogsPage'));

