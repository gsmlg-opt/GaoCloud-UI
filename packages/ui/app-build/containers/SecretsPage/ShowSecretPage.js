/**
 *
 * ShowSecretPage
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector, createSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { fromJS } from 'immutable';
import { reduxForm, getFormValues } from 'redux-form/immutable.js';
import { SubmissionError, submit } from 'redux-form';

import classNames from 'classnames';
import { withStyles } from '@mui/styles.js';
import Menubar from "../../components/Menubar/index.js";
import CssBaseline from '@mui/material/CssBaseline.js';
import Typography from '@mui/material/Typography.js';
import TextField from '@mui/material/TextField.js';
import List from '@mui/material/List.js';
import ListItem from '@mui/material/ListItem.js';
import ListItemText from '@mui/material/ListItemText.js';
import Button from '@mui/material/Button.js';
import Dialog from '@mui/material/Dialog.js';
import AttachmentIcon from '@mui/icons-material/Attachment.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs.js';
import Helmet from 'components/Helmet/Helmet.js';

import { makeSelectCurrentID as makeSelectClusterID } from '../../../app/ducks/clusters/selectors';
import { makeSelectCurrentID as makeSelectNamespaceID } from '../../../app/ducks/namespaces/selectors';
import * as actions from '../../../app/ducks/secrets/actions';
import {
  makeSelectURL,
  makeSelectCurrent,
  makeSelectCurrentID,
} from '../../../app/ducks/secrets/selectors';

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
