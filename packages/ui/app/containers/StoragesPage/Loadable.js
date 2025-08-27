/**
 *
 * Asynchronously loads the component for StoragePage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "StoragePage" */ './index')
);

export const CreateStoragePage = lazy(() =>
  import(/* webpackChunkName: "CreateStoragePage" */ './CreatePage')
);

export const EditStoragePage = lazy(() =>
  import(/* webpackChunkName: "EditStoragePage" */ './EditPage')
);

export const StorageDetailPage = lazy(() =>
  import(/* webpackChunkName: "StorageDetailPage" */ './ShowItemPage')
);
