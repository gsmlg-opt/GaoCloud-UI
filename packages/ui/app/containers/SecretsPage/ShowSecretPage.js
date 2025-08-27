/**
 *
 * ShowSecretPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable';
import { SubmissionError, submit } from 'redux-form';

import classNames from 'classnames';
import { withStyles } from '@mui/material/styles';
import Menubar from 'components/Menubar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AttachmentIcon from '@mui/icons-material/Attachment';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import CardFooter from 'components/Card/CardFooter';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Helmet from 'components/Helmet/Helmet';

import { makeSelectCurrentID as makeSelectClusterID } from 'ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from 'ducks/namespaces/selectors';
import * as actions from 'ducks/secrets/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from 'ducks/secrets/selectors';

import messages from './messages';
import useStyles from './styles';

export const ShowSecret = ({
  clusterID,
  namespaceID,
  id,
  url,
  readSecret,
  secret,
}) => {
  const classes = useStyles();
  useEffect(() => {
    readSecret(id, { url: `${url}/${id}`, clusterID, namespaceID });
  }, [clusterID, id, namespaceID, readSecret, url]);

  return (
    <div className={classes.root}>
      <Helmet title={messages.pageTitle} description={messages.pageDesc} />
      <CssBaseline />
      <div className={classes.content}>
        <Breadcrumbs
          data={[
            {
              path: `/clusters/${clusterID}/namespaces/${namespaceID}/secrets`,
              name: <FormattedMessage {...messages.pageTitle} />,
            },
            {
              path: '#',
              name: <FormattedMessage {...messages.showSecret} />,
            },
          ]}
        />
        <GridContainer className={classes.grid}>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h4>
                  <FormattedMessage {...messages.showSecret} />
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
                    <ReadOnlyInput
                      labelText={<FormattedMessage {...messages.formName} />}
                      value={secret.get('name')}
                      formControlProps={{
                        className: classes.nameControl,
                      }}
                      fullWidth
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    {secret.get('data') &&
                      secret.get('data').map((sec, idx) => (
                        <GridContainer key={`${idx}-${sec.get('key')}`}>
                          <GridItem xs={3} sm={3} md={3}>
                            <ReadOnlyInput
                              labelText={
                                <FormattedMessage {...messages.formDataKey} />
                              }
                              value={sec.get('key')}
                              fullWidth
                              formControlProps={{
                                className: classes.nameControl,
                              }}
                            />
                          </GridItem>
                          <GridItem xs={3} sm={3} md={3}>
                            <ReadOnlyInput
                              labelText={
                                <FormattedMessage {...messages.formDataValue} />
                              }
                              value={sec.get('value')}
                              fullWidth
                              formControlProps={{
                                className: classes.nameControl,
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      ))}
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  clusterID: makeSelectClusterID(),
  namespaceID: makeSelectNamespaceID(),
  id: makeSelectCurrentID(),
  secret: makeSelectCurrent(),
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

export default compose(withConnect)(ShowSecret);
