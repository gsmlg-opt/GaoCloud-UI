/**
 *
 * EventsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';
import { fromJS } from 'immutable';
import { Link } from 'react-router-dom';

import history from '../../utils/history.js';

import { withStyles } from '@mui/styles.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
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
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectEvents } from '../../../app/ducks/events/selectors';
import * as actions from '../../../app/ducks/events/actions';

import messages from './messages';
import useStyles from './styles';
import EventsTable from './Table';
import FilterForm from './EventsFilterForm';

export const formName = 'eventsFilterForm';

const EventsFilterForm = reduxForm({
  form: formName,
})(FilterForm);

const formInitialValues = fromJS({
  type: '__all__',
  namespace: '__all__',
  kind: '__all__',
  name: '__all__',
});

const EventsPage = ({ clusterID, events, filters }) => {
  const classes = useStyles();
  const options = events.reduce(
    ({ types, namespaces, kinds, names }, { type, namespace, kind, name }) => ({
      types: types.includes(type) ? types : types.concat([type]),
      namespaces: namespaces.includes(namespace)
        ? namespaces
        : namespaces.concat([namespace]),
      kinds: kinds.includes(kind) ? kinds : kinds.concat([kind]),
      names: names.includes(name) ? names : names.concat([name]),
    }),
    {
      types: [],
      namespaces: [],
      kinds: [],
      names: [],
    }
  );
  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/events`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
          ]}
        />
        <Typography component="div">
          <GridContainer className={classes.grid}>
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardHeader>
                  <h4>
                    <FormattedMessage {...messages.events} />
                  </h4>
                  <IconButton
                    className={classes.createBtnLink}
                    onClick={()=>{history.go(-1)}}
                  >
                    <BackIcon />
                  </IconButton>
                </CardHeader>
                <CardBody>
                  <EventsFilterForm
                    classes={classes}
                    initialValues={formInitialValues}
                    {...options}
                  />
                  <EventsTable filters={filters} />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Typography>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  filters: createSelector(
    getFormValues(formName),
    (v) => v || formInitialValues
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...actions,
    },
    dispatch
  );

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EventsPage);
