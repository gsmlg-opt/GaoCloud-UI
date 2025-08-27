/**
 *
 * Asynchronously loads the component for SecretsPage
 *
 */

import React, { lazy } from 'react';

export default lazy(() =>
  import(/* webpackChunkName: "SecretsPage" */ './index')
);

export const CreateSecretPage = lazy(() =>
  import(/* webpackChunkName: "CreateSecretPage" */ './CreateSecretPage')
);

export const ShowSecretPage = lazy(() =>
  import(/* webpackChunkName: "ShowSecretPage" */ './ShowSecretPage')
);

export const EditSecretPage = lazy(() =>
  import(/* webpackChunkName: "EditSecretPage" */ './EditSecretPage')
);
