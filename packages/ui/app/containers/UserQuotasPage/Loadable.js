/**
 *
 * Asynchronously loads the component for UserQuotasPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "UserQuotasPage" */ './index')
);

export const CreateUserQuotaPage = lazy(() =>
  import(/* webpackChunkName: "CreateUserQuotaPage" */ './CreateUserQuotaPage')
);

export const EditUserQuotaPage = lazy(() =>
  import(/* webpackChunkName: "EditUserQuotaPage" */ './EditUserQuotaPage')
);

export const UserQuotaDetailPage = lazy(() =>
  import(/* webpackChunkName: "UserQuotaDetailPage" */ './UserQuotaDetailPage')
);

export const RequestUserQuotaPage = lazy(() =>
  import(
    /* webpackChunkName: "RequestUserQuotaPage" */ './RequestUserQuotaPage'
  )
);

export const AdminUserQuotaPage = lazy(() =>
  import(/* webpackChunkName: "AdminUserQuotaPage" */ './AdminUserQuotaPage')
);
