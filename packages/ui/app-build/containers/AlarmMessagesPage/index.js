/**
 *
 * AlarmMessagesPage
 *
 */
import React, { useEffect, useState, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import history from '../../utils/history.js';

import Helmet from 'components/Helmet/Helmet.js';
import { FormattedMessage } from 'react-intl';
import CssBaseline from '@mui/material/CssBaseline.js';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography.js';
import Fab from '@mui/material/Fab.js';
import IconButton from '@mui/material/IconButton.js';

import BackIcon from 'components/Icons/Back.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';

import { makeSelectURL } from '../../../app/ducks/alarms/selectors';
import * as actions from '../../../app/ducks/alarms/actions';

import useStyles from './styles';
import messages from './messages';
import AlarmsTable from './Table';

const AlarmMessagesPage = ({ url, loadAlarms }) => {
  const classes = useStyles();
  useEffect(() => {
    loadAlarms(url);
    return () => {
      // try cancel something when unmount
    };
  }, [loadAlarms, url]);
  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/alarms`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.alarms} />
                </h4>
                <IconButton
                  className={classes.createBtnLink}
                  onClick={()=>{history.go(-1)}}
                >
                  <BackIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <AlarmsTable />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  url: makeSelectURL(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...actions }, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AlarmMessagesPage);
