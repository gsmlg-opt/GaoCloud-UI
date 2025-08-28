/**
 *
 * UserQuotasPage
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@mui/styles';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.js';
import IconButton from '@mui/material/IconButton';
import AddIcon from '../../components/Icons/Add.js';
import Helmet from '../../components/Helmet/Helmet.js';

import { makeSelectURL } from '../../ducks/userQuotas/selectors.js';
import * as actions from '../../ducks/userQuotas/actions.js';

import messages from './messages';
import useStyles from './styles';
import UserQuotasTable from './UserQuotasTable';

const UserQuotasPage = ({ url, loadUserQuotas }) => {
  const classes = useStyles();

  useEffect(() => {
    if (url) {
      loadUserQuotas(url);
    }
    const t = setInterval(() => loadUserQuotas(url), 3000);
    return () => clearInterval(t);
  }, [loadUserQuotas, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: '/userQuotas',
              name: <FormattedMessage {...messages.userQuotas} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.userQuotas} />
                </h4>
                <IconButton
                  aria-label={<FormattedMessage {...messages.userQuotas} />}
                  component={Link}
                  to="/userQuotas/create"
                  className={classes.createBtnLink}
                >
                  <AddIcon />
                </IconButton>
              </CardHeader>
              <CardBody>
                <UserQuotasTable />
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
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserQuotasPage);
