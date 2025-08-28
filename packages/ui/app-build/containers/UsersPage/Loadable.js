/**
 *
 * Asynchronously loads the component for UsersPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "UsersPage" */ './index')
);

export const CreateUserPage = lazy(() =>
  import(/* webpackChunkName: "CreateUsersPage" */ './CreateUserPage')
);

export const EditUserPage = lazy(() =>
  import(/* webpackChunkName: "EditUsersPage" */ './EditUserPage')
);

export const UserProfilePage = lazy(() =>
  import(/* webpackChunkName: "UserProfilePage" */ './UserProfilePage')
);

export const PasswordSetupPage = lazy(() =>
  import(/* webpackChunkName: "PasswordSetupPage" */ './PasswordSetupPage')
);
