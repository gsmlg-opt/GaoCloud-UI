/**
 *
 * HorizontalPodAutoscalers Table
 *
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { SimpleTable } from '../../../src/com/index.js';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDelete from '../../components/ConfirmDelete/ConfirmDelete.js';

import { makeSelectLocation } from '../../ducks/app/selectors.js';
import { makeSelectCurrentID as makeSelectClusterID } from '../../ducks/clusters/selectors.js';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../ducks/namespaces/selectors.js';
import { makeSelectHorizontalPodAutoscalersList } from '../../ducks/horizontalPodAutoscalers/selectors.js';
import * as actions from '../../ducks/horizontalPodAutoscalers/actions.js';

import messages from './messages';
import useStyles from './styles';
import schema from './tableSchema';

/* eslint-disable react/prefer-stateless-function */
const HorizontalPodAutoscalersTable = ({
  location,
  data,
  clusterID,
  namespaceID,
  removeHorizontalPodAutoscaler,
}) => {
  const classes = useStyles();
  const intl = useIntl();
  const pathname = location.get('pathname');
  const mergedSchema = schema
    .map((sch) => {
      if (sch.id === 'actions') {
        return {
          ...sch,
          props: {
            removeHorizontalPodAutoscaler,
            clusterID,
            namespaceID,
          },
        };
      }
      if (sch.id === 'name') {
        return {
          ...sch,
          props: { pathname,classes },
        };
      }
      if (sch.id === 'app') {
        return {
          ...sch,
          props: { clusterID, namespaceID },
        };
      }
      if (sch.id === 'metrics') {
        return {
          ...sch,
          props: { intl },
        };
      }
      return sch;
    })
    .map((s) => ({
      ...s,
      label: <FormattedMessage {...messages[`tableTitle${s.label}`]} />,
    }));

  return (
    <Paper className={classes.tableWrapper}>
      <SimpleTable
        className={classes.table}
        schema={mergedSchema}
        data={data}
      />
    </Paper>
  );
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  data: makeSelectHorizontalPodAutoscalersList(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HorizontalPodAutoscalersTable);
