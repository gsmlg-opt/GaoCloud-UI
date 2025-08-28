/**
 *
 * ClustersPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import getByKey from '../../../src/utils/getByKey';

import { Link } from 'react-router-dom';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from 'components/Icons/Add.js';
import Helmet from 'components/Helmet/Helmet.js';
import DangerText from 'components/Typography/Danger.js';
import ErrorDialog from 'components/Dialog/ErrorDialog.js';

import { makeSelectHttpError } from '../../../app/ducks/app/selectors';
import * as actions from '../../../app/ducks/app/actions';

import messages from './messages';

export const ErrorDialogPage = ({ error, clearHttpError }) => {
  const status = error && error.status;
  const responseMessage = error && error.response && error.response.message;

  return (
    <ErrorDialog
      title={<FormattedMessage {...messages.dialogTitle} />}
      open={Boolean(error)}
      onClose={clearHttpError}
    >
      <Card>
        <CardBody>
          <DangerText>
            {status === 0 ? <FormattedMessage {...messages.connectionFailed} /> : responseMessage}
          </DangerText>
        </CardBody>
      </Card>
    </ErrorDialog>
  );
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectHttpError(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ErrorDialogPage);
