/**
 *
 * Users Page
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { Link } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import IconButton from '@mui/material/IconButton.js';
import AddIcon from 'components/Icons/Add.js';
import Menubar from "../../components/Menubar/index.js";
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectLocation } from '../../../app/ducks/app/selectors';
import * as actions from '../../../app/ducks/users/actions';
import { makeSelectURL } from '../../../app/ducks/users/selectors';

import messages from './messages';
import useStyles from './styles';
import UsersTable from './UsersTable';

export const UsersPage = ({ location, loadUsers, url }) => {
  const classes = useStyles();
  useEffect(() => {
    loadUsers(url);
  }, [loadUsers, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              name: <FormattedMessage {...messages.usersList} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.users} />
                </h4>
                <Link
                  to={`${location.get('pathname')}/create`}
                  className={classes.createBtnLink}
                >
                  <IconButton size="small" color="default">
                    <AddIcon />
                  </IconButton>
                </Link>
              </CardHeader>
              <CardBody>
                <UsersTable />
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
  location: makeSelectLocation(),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UsersPage);
